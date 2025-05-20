import React, {useEffect, useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IGames } from "@/components/interfaces/IGames";
import { ThemedView } from "@/components/ThemedView";
import GameModal from "@/components/modals/GameModal";
import {router} from 'expo-router';
import MyScrollView from "@/components/MyScrollView";

export default function gamesdetailsscreen(){
    const {gameId} = useLocalSearchParams();
    const [gameForDetail, setGameForDetail] = useState<IGames>();
    const [games, setGames] = useState<IGames[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        async function getData() {
            try{
                const data = await AsyncStorage.getItem("@GamesApp:games");
                const gamesData:IGames[] = data != null ? JSON.parse(data) : [];
                setGames(gamesData);

                gamesData.forEach((element) => {
                    if (element.id.toString() == gameId){
                        setGameForDetail(element);
                    }
                });
            } catch(e){

            }
        }

        getData()
    }, [])

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
        router.replace("/(tabs)/gameslistscreen");
        setModalVisible(false)
    };

    const onDelete = () => {
        if (gameForDetail){
            const newGames: Array<IGames> = [];
            for (let index = 0; index < games.length; index++){
                const game = games[index];
                if (game.id != gameForDetail!.id){
                    newGames.push(game);
                }
            }
            setGames(newGames);
            AsyncStorage.setItem("@GamesApp:games", JSON.stringify(newGames))
        }

        router.replace("/(tabs)/gameslistscreen");
    };

    const openEditModal = (selectedGame: IGames) =>{
        setGameForDetail(selectedGame);
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false);
    }
    return(
        <MyScrollView headerBackgroundColor={{light: '#A1CEDC', dark:'#1D3d47'}}>
            <View style={styles.box}>
                <View>
                    <Text style={styles.text}>Title: {gameForDetail ? gameForDetail.name : ''}</Text>
                    <Text style={styles.text}>Price: R${gameForDetail ? gameForDetail.price : 0}</Text>
                    <Text style={styles.text}>Creator: {gameForDetail ? gameForDetail?.creator : ''}</Text>
                    <Text style={styles.text}>Publisher: {gameForDetail ? gameForDetail?.publisher : ''}</Text>
                    <Text style={styles.text}>Year of Realease: {gameForDetail ? gameForDetail?.year_of_realease : 0}</Text>
                    <Text style={styles.text}>Minimum Requirements: {gameForDetail ? gameForDetail?.minimum_requirements : ''}</Text>
                    <Text style={styles.text}>Platform: {gameForDetail ? gameForDetail?.platform : ''}</Text>
                </View>

                <View style={styles.buttonRow}>
                      <ThemedView style={styles.buttonEdit}>
                        <TouchableOpacity onPress={() => openEditModal(gameForDetail!)}>
                        <Text style={styles.button}>✏️</Text>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.buttonDelete}>
                        <TouchableOpacity onPress={onDelete}>
                        <Text style={styles.button}>🗑️</Text>
                        </TouchableOpacity>
                    </ThemedView>
                </View>
            </View>
            <GameModal
                visible={modalVisible}
                onCancel={closeModal}
                onAdd={onAdd}
                onDelete={onDelete}
                game={gameForDetail}
            />
        </MyScrollView>
    );
}

const styles = StyleSheet.create({
    box:{
        backgroundColor:'#1D3D47',
        alignItems:'center',
        padding:20,
        margin:20,
        borderRadius:5,
    },
    text:{
        fontSize:20,
        fontWeight:'bold',
        color:'white'
    },
    button:{
        fontWeight: 'bold',
        fontSize: 25,
    },
    buttonEdit: {
        backgroundColor: 'rgb(22, 109, 136)',
        borderRadius: 20,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDelete: {
        backgroundColor: 'rgb(22, 109, 136)',
        borderRadius: 20,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonRow:{
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: 20,
        gap: 10
    }
})