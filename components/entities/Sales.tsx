import React from "react";
import {StyleSheet, Text, View} from "react-native";

export type SalesProps = {
    games_purchased: string;
    purchase_value: number;
    date: string;
    purchaser: string;  
};

export default function Sales({games_purchased, purchase_value, date, purchaser} : SalesProps){
    return (
        <View style={styles.box}>
            <Text style={styles.games_purchased}>Games: {games_purchased}</Text>
            <Text style={styles.purchase_value}>Value: R${purchase_value}</Text>
            <Text style={styles.date}>Date: {date}</Text>
            <Text style={styles.purchaser}>Purchaser: {purchaser}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    box: {
        backgroundColor:'White',
        alignItems: 'center',
        padding: 20,
        margin: 20,
        borderRadius: 5,
    },
    games_purchased:{
        fontSize:20,
        fontWeight: 'bold',
        color:'white'
    },
    purchase_value:{
        alignItems:'flex-end',
        fontSize:20,
        fontWeight: 'bold',
        color:'white'
    },
    date:{
        fontSize:20,
        fontWeight: 'bold',
        color:'white'
    },
    purchaser:{
        fontSize:20,
        fontWeight: 'bold',
         color:'white'
    }
});