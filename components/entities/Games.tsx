import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type GamesProps = {
    title: string;
    price: number;
};

export default function Games({title, price}: GamesProps){
    return (
        <View style={styles.box}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>{price}</Text>
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
    title:{
        fontSize:20,
        fontWeight: 'bold',
    },
    price:{
        alignItems:'flex-end',
        fontSize:20,
        fontWeight: 'bold',
    }
});