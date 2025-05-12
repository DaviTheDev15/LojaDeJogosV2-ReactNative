import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { ISales } from "@/components/interfaces/ISales";
import MyScrollView from "@/components/MyScrollView";

export type SaleModalProps = {
    visible: boolean;
    onAdd:(games_purchased: string, purchase_value: number,
        data: string,purchaser: string, id: number) => void;
    onCancel: () => void;
    onDelete: (id: number) => void;
    sale?: ISales;
};

export default function SaleModal({visible, onAdd, onCancel, onDelete, sale} : SaleModalProps){
    const [games_purchased, setGames_purchased] = useState('');
    const [purchase_value, setPurchase_value] = useState(0);
    const [data, setData] = useState('');
    const [purchaser, setPurchaser] = useState('');
    const [id, setId] = useState<number>(0)

    useEffect(() => {
        if(sale){
            setGames_purchased(sale.games_purchased);
            setPurchase_value(sale.purchase_value);
            setData(sale.date);
            setPurchaser(sale.purchaser);
            setId(sale.id)
        } else{
            setGames_purchased('');
            setPurchase_value(0);
            setData('');
            setPurchaser('');
            setId(0)
        }
    }, [sale])


    return (
        <MyScrollView>
                    <TextInput 
                        style={styles.boxInput}
                        placeholder="Jogos Comprados"
                        value={games_purchased}
                        onChangeText={text => setGames_purchased(text)}
                        autoFocus
                    />
                    <TextInput 
                        style={styles.boxInput}
                        placeholder="Valor da Compra"
                        value={purchase_value.toString()}
                        onChangeText={text => setPurchase_value(Number(text))}
                    />
                    <TextInput 
                        style={styles.boxInput}
                        placeholder="Data da compra"
                        value={data}
                        onChangeText={text => setData(text)}
                    />
                    <TextInput 
                        style={styles.boxInput}
                        placeholder="Comprador"
                        value={purchaser}
                        onChangeText={text => setPurchaser(text)}
                    />
                   <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={() => onAdd(games_purchased,purchase_value, data, purchaser, id)}>
                            <Text style={styles.buttonText}>
                                Add
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCancel} onPress={() => onCancel()}>
                            <Text style={styles.buttonText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAdd} onPress={() => onDelete(id)} disabled={id == 0}>
                            <Text style={styles.buttonText}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>                    
        </MyScrollView>
    )
}; 


const styles = StyleSheet.create({
    container: {
        backgroundColor:'rgba(0,0,0,0.7)',
        alignContent:"center",
        justifyContent:"center",
        flex:1
    },
    boxContainer: {
        backgroundColor:'rgba(255, 255, 255, 1)',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        margin:20,
    },
    buttonText: {
        fontWeight:"bold",
        color:'rgba(255, 255, 255, 1)',
    },
    buttonAdd:{
        backgroundColor:'rgb(18, 150, 47)',
        borderRadius:5,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        padding:0
    },
    buttonCancel:{
        backgroundColor:'rgb(215, 28, 18)',
        borderRadius:5,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        padding:0
    },
    buttonContainer: {
        flexDirection:"row",
        marginTop:10,
        height:70
    },
    boxInput:{
        alignSelf:"stretch",
        height:40,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        margin:5
    }
})

