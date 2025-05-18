import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput} from 'react-native';
import { IUser } from "../interfaces/IUser";

export type IUserModalProps = {
    visible: boolean;
    onAdd:(email: string, password: string, id: number) => void;
    onCancel: () => void;
    onDelete: (id: number) => void;
    user?: IUser;
};

export default function UserModal({visible, onAdd, onCancel, onDelete, user} : IUserModalProps){
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [id, setId] = useState<number>(0)

    useEffect(() => {
        if(user){
            setEmail(user.email);
            setPassword(user.password)
            setId(user.id)
        } else{
            setEmail('');
            setPassword('')
            setId(0)
        }
    }, [user])


    return (
        <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={() => {}}>
            <View style={styles.container}>
                <View style={styles.boxContainer}>
                    <TextInput 
                        style={styles.boxInput}
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        autoFocus
                    />
                    <TextInput 
                        style={styles.boxInput}
                        placeholder="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                   <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={() => onAdd(email, password, id)}>
                            <Text style={styles.buttonText}>
                                💾
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCancel} onPress={() => onCancel()}>
                            <Text style={styles.buttonText}>
                                ❌
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonDelete} onPress={() => onDelete(id)} disabled={id == 0}>
                            <Text style={styles.buttonText}>
                                🗑️
                            </Text>
                        </TouchableOpacity>
                    </View>                    
                </View>
            </View>
        </Modal>
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
        backgroundColor:'#166D88',  
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
        padding:5
    },
    buttonCancel:{
        backgroundColor:'rgb(243, 225, 86)',
        borderRadius:5,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        padding:5
    },
    buttonDelete:{
        backgroundColor:'rgb(215, 28, 18)',
        borderRadius:5,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        padding:5
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
        backgroundColor: '#1D3D47',
        margin:5,
        color:'white'
    }
})
