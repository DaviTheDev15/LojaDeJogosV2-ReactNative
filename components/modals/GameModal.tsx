import React, { useEffect, useState} from "react";
import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput} from 'react-native';
import { IGames } from "../interfaces/IGames";

export type GameModalProps = {
    visible: boolean;
    onAdd: (title: string, price: number,creator: string, publisher: string, year_of_realease: number, minimum_requirements: string, platform: string , id: number) => void;
    onCancel: () => void;
    onDelete: (id: number) => void;
    game?: IGames;
};

export default function GameModal({visible, onAdd, onCancel, onDelete, game} : GameModalProps){
    const [title, setTitle] = useState<string>('');

    const [price, setPrice] = useState<string>('');
    const [creator, setCreator] = useState<string>('')
    const [id, setId] = useState<number>(0);
    const [publisher, setPublisher] = useState<string>('');
    const [year_of_realease, setYear_of_realease] = useState<string>('');
    const [minimum_requirements, setMinimum_requirements] = useState<string>('');
    const [platform, setPlataform] = useState<string>('');

    useEffect(() => {
        if (game){
            setTitle(game.name);
            setPrice(game.price.toString());
            setId(game.id);
            setCreator(game.creator)
            setPublisher(game.publisher)
            setMinimum_requirements(game.minimum_requirements)
            setPlataform(game.platform)
            setYear_of_realease(game.year_of_realease.toString())
        } else{
            setTitle('');
            setPrice('');
            setId(0); 
            setCreator('')
            setPublisher('')
            setMinimum_requirements('')
            setPlataform('')
            setYear_of_realease('')
        }
    },[game])

    return (
        <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={() => {}}>
            <View style={styles.container}>
                <View style={styles.boxContainer}>
                    <TextInput 
                        style={styles.boxInput}
                        placeholder="Title"
                        value={title}
                        onChangeText={text => setTitle(text)}
                        autoFocus
                    />
                    <TextInput 
                        style={styles.boxInput}
                        placeholder="Price"
                        keyboardType="decimal-pad"
                        value={price}
                        onChangeText={text => {
                            const cleaned = text.replace(/[^0-9.]/g, '');
                            setPrice(cleaned);
                        }}
                    />
                    <TextInput 
                        style={styles.boxInput}
                        placeholder="Creator"
                        value={creator}
                        onChangeText={text => setCreator(text)}
                    />
                    <TextInput 
                        style={styles.boxInput}
                        placeholder="Publisher"
                        value={publisher}
                        onChangeText={text => setPublisher(text)}
                    />
                    <TextInput 
                        style={styles.boxInput}
                        placeholder="Minimum Requirements"
                        value={minimum_requirements}
                        onChangeText={text => setMinimum_requirements(text)}
                    />
                    <TextInput 
                        style={styles.boxInput}
                        placeholder="Platform"
                        value={platform}
                        onChangeText={text => setPlataform(text)}
                    />
                    <TextInput 
                        style={styles.boxInput}
                        placeholder="Year of Release"
                        keyboardType="decimal-pad"
                        value={year_of_realease}        
                        onChangeText={text => {
                            const cleaned = text.replace(/[^0-9.]/g, '');
                            setYear_of_realease(cleaned);
                        }}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={() => onAdd(title, parseFloat(price), creator, publisher, parseFloat(year_of_realease), minimum_requirements, platform, id)}>
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