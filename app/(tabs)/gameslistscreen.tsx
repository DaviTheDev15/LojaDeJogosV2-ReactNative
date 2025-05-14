import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Games from '@/components/entities/Games';
import MyScrollView from '@/components/MyScrollView';
import {useEffect, useState} from 'react';
import { IGames } from '@/components/interfaces/IGames';
import GameModal from '@/components/modals/GameModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';


export default function SaleListScreen(){
    const [games, setGames] = useState<IGames[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedGame, setSelectedGame] = useState<IGames>();
    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        async function getData() {
            try{
                const data = await AsyncStorage.getItem("@GamesApp:games");
                const gamesData = data != null ? JSON.parse(data) : [];
                setGames(gamesData);
            } catch (e){

            }
        }

        getData();
    }, [])

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted'){
                setErrorMsg('Permission to acess location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, [])

    let text = 'Waiting...';
    if (errorMsg){
        text = errorMsg;
    } else if(location){
        text = JSON.stringify(location);
    }

    const onAdd = async (name: string, price: number,  creator: string, publisher: string , year_of_realease: number, minimum_requirements: string, platform: string ,id?:number) => {

        if (!id || id <= 0){
            const newGame: IGames = {
                id: Math.random() * 1000,
                name: name,
                price: price,
                creator: creator,
                publisher: publisher,
                year_of_realease: year_of_realease,
                minimum_requirements: minimum_requirements,
                platform: platform
            };

            const gamePlus: IGames[] = [
                ...games,
                newGame
            ];

            setGames(gamePlus);
            AsyncStorage.setItem("@GamesApp:games", JSON.stringify(gamePlus))
        } else{
            games.forEach(game => {
                if (game.id == id){
                    game.name = name;
                    game.price = price;
                    game.creator = creator;
                    game.publisher = publisher;
                    game.minimum_requirements = minimum_requirements;
                    game.platform = platform;
                    game.year_of_realease = year_of_realease;
                }
            });

            AsyncStorage.setItem("@GamesApp:games", JSON.stringify(games))
        }
        setModalVisible(false)
    };

    const onDelete = (id: number) => {
        const newGames: Array<IGames> = [];
        for (let index = 0; index < games.length; index++){
            const game = games[index]
            if (game.id != id){
                newGames.push(game);
            }
        }

        setGames(newGames);
        AsyncStorage.setItem("@GamesApp:games", JSON.stringify(newGames));
        setModalVisible(false)
    }
    
    const openModal = () => {
        setSelectedGame(undefined);
        setModalVisible(true);
    }

    const openEditModal = (selectedGame: IGames) =>{
        setSelectedGame(selectedGame);
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <MyScrollView headerBackgroundColor={{light: '#A1CEDC', dark:'#1D3d47'}}>
            <ThemedView style={styles.headerContainer}>
                <TouchableOpacity onPress={() => openModal()}>
                    <Text style={styles.headerButton}>Add New Game</Text>
                </TouchableOpacity>
            </ThemedView>
            {games.map(game => (
                <ThemedView key={game.id} style={styles.itemContainer}>
                    <TouchableOpacity onPress={() => openEditModal(game)}>
                        <Games
                        title={game.name} price={game.price} />
                    <Text style={styles.text1}>Click for more informations</Text>
                    </TouchableOpacity>
                </ThemedView>
            ))}
            <Text style={styles.text2}>{text}</Text>
            <GameModal
                visible={modalVisible}
                onCancel={closeModal}
                onAdd={onAdd}
                onDelete={onDelete}
                game={selectedGame}
            />
        </MyScrollView>
    )
}

const styles = StyleSheet.create({
    headerContainer:{
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:5,
        borderRadius:10,
        margin:10
    },
    headerButton:{
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 10,
        marginTop:50    
    },
    text1:{
        color:'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    text2:{
        color:'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    itemContainer: {
    backgroundColor: '#1D3D47',
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    },
})