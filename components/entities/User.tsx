import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type UserProps = {
    email: string;
    senha: string;
};

export default function User({email, senha}: UserProps){
    return (
        <View style={styles.box}>
            <Text style={styles.email}>{email}</Text>
            <Text style={styles.senha}>{senha}</Text>
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
    email:{
        fontSize:20,
        fontWeight: 'bold',
    },
    senha:{
        alignItems:'flex-end',
        fontSize:20,
        fontWeight: 'bold',
    }
});