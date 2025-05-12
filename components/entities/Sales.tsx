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
            <Text style={styles.games_purchased}>{games_purchased}</Text>
            <Text style={styles.purchase_value}>{purchase_value}</Text>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.purchaser}>{purchaser}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    box: {
        backgroundColor:'Blue',
        alignItems: 'center',
        padding: 20,
        margin: 20,
        borderRadius: 5,
    },
    games_purchased:{
        fontSize:20,
        fontWeight: 'bold',
    },
    purchase_value:{
        alignItems:'flex-end',
        fontSize:20,
        fontWeight: 'bold',
    },
    date:{
        fontSize:20,
        fontWeight: 'bold',
    },
    purchaser:{
        fontSize:20,
        fontWeight: 'bold',
    }
});