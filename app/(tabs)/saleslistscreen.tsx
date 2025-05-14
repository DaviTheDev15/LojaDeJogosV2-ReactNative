import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Sales from '@/components/entities/Sales';
import MyScrollView from '@/components/MyScrollView';
import {useEffect, useState} from 'react';
import { ISales } from '@/components/interfaces/ISales';
import SaleModal from '@/components/modals/SaleModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';


export default function SaleListScreen(){
    const [sales, setSales] = useState<ISales[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedSale, setSelectedSale] = useState<ISales>();
    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        async function getData() {
            try{
                const data = await AsyncStorage.getItem("@SalesApp:sales");
                const salesData = data != null ? JSON.parse(data) : [];
                setSales(salesData);
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

    const onAdd = async (games_purchased: string, purchase_value: number, date: string, purchaser: string, id?: number) => {

        if(!id || id <= 0){
            const newSale: ISales = {
                id: Math.random() * 1000,
                games_purchased: games_purchased,
                purchase_value: purchase_value,
                date: date,
                purchaser: purchaser
            };

            const salePlus: ISales[] = [
                ...sales,
                newSale
            ];
            setSales(salePlus);
            AsyncStorage.setItem("@SalesApp:sales", JSON.stringify(salePlus))
        } else {
            sales.forEach(sale => {
                if (sale.id == id){
                    sale.games_purchased = games_purchased;
                    sale.purchase_value = purchase_value;
                    sale.date = date;
                    sale.purchaser = purchaser;
                }
            });
            AsyncStorage.setItem("@SalesApp:sales", JSON.stringify(sales))
        }
        setModalVisible(false)
    };

        const onDelete = (id: number) => {
            const newSales: Array<ISales> = [];
            for (let index = 0; index < sales.length; index++){
                const sale = sales[index]
                if (sale.id != id){
                    newSales.push(sale);
                }
            }
    
            setSales(newSales);
            AsyncStorage.setItem("@SalesApp:sales", JSON.stringify(sales))
            setModalVisible(false)
        }
    
    const openModal = () => {
        setSelectedSale(undefined);
        setModalVisible(true);
    }

    const openEditModal = (selectedSale: ISales) =>{
        setSelectedSale(selectedSale);
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <MyScrollView headerBackgroundColor={{light: '#A1CEDC', dark:'#1D3d47'}}>
            <ThemedView style={styles.headerContainer}>
                <TouchableOpacity onPress={() => openModal()}>
                    <Text style={styles.headerButton}>Add New Sale</Text>
                </TouchableOpacity>
            </ThemedView>
            {sales.map(sale => (
                <ThemedView key={sale.id} style={styles.itemContainer}>
                    <TouchableOpacity onPress={() => openEditModal(sale)}>
                        <Sales
                            games_purchased={sale.games_purchased}
                            purchase_value={sale.purchase_value}
                            date={sale.date}
                            purchaser={sale.purchaser}
                        />
                    </TouchableOpacity>
                </ThemedView>
            ))}
            <Text style={styles.text}>{text}</Text>
            <SaleModal
                visible={modalVisible}
                onCancel={closeModal}
                onAdd={onAdd}
                onDelete={onDelete}
                sale={selectedSale}
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
    text:{
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