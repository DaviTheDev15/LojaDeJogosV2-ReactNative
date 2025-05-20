import React, {useEffect, useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ISales } from "@/components/interfaces/ISales";
import { ThemedView } from "@/components/ThemedView";
import SaleModal from "@/components/modals/SaleModal";
import {router} from 'expo-router';
import MyScrollView from "@/components/MyScrollView";

export default function salesdetailsscreen(){
    const {saleId} = useLocalSearchParams();
    const [saleForDetail, setSaleForDetail] = useState<ISales>();
    const [sales, setSales] = useState<ISales[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        async function getData() {
            try{
                const data = await AsyncStorage.getItem("@SalesApp:sales");
                const salesData:ISales[] = data != null ? JSON.parse(data) : [];
                setSales(salesData);

                salesData.forEach((element) => {
                    if (element.id.toString() == saleId){
                        setSaleForDetail(element);
                    }
                });
            } catch(e){

            }
        }

        getData()
    }, [])

    const onAdd = async (games_purchased: string, purchase_value: number, date: string, purchaser: string, id?: number) => {

        if (!id || id <= 0){
            const newSale: ISales = {
                id: Math.random() * 1000,
                games_purchased: games_purchased,
                purchase_value: purchase_value,
                date: date,
                purchaser: purchaser,
            };

            const salePlus: ISales[] = [
                ...sales,
                newSale
            ];

            setSales(salePlus);
            AsyncStorage.setItem("@SalesApp:sales", JSON.stringify(salePlus))
        } else{
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
        router.replace("/(tabs)/saleslistscreen");
        setModalVisible(false)
    };

    const onDelete = () => {
        if (saleForDetail){
            const newSales: Array<ISales> = [];
            for (let index = 0; index < sales.length; index++){
                const sale = sales[index];
                if (sale.id != saleForDetail!.id){
                    newSales.push(sale);
                }
            }
            setSales(newSales);
            AsyncStorage.setItem("@SalesApp:sales", JSON.stringify(newSales))
        }

        router.replace("/(tabs)/saleslistscreen");
    };

    const openEditModal = (selectedSale: ISales) =>{
        setSaleForDetail(selectedSale);
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false);
    }
    return(
        <MyScrollView headerBackgroundColor={{light: '#A1CEDC', dark:'#1D3d47'}}>
            <View style={styles.box}>
                <View>
                    <Text style={styles.text}>Games Purchased: {saleForDetail ? saleForDetail.games_purchased : ''}</Text>
                    <Text style={styles.text}>Purchase Value: R${saleForDetail ? saleForDetail.purchase_value : 0}</Text>
                    <Text style={styles.text}>Date: {saleForDetail ? saleForDetail?.date : ''}</Text>
                    <Text style={styles.text}>Purchaser: {saleForDetail ? saleForDetail?.purchaser : ''}</Text>
                </View>

                <View style={styles.buttonRow}>
                      <ThemedView style={styles.buttonEdit}>
                        <TouchableOpacity onPress={() => openEditModal(saleForDetail!)}>
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
            <SaleModal
                visible={modalVisible}
                onCancel={closeModal}
                onAdd={onAdd}
                onDelete={onDelete}
                sale={saleForDetail}
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