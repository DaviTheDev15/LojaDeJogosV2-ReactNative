import React, {useEffect, useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "@/components/interfaces/IUser";
import { ThemedView } from "@/components/ThemedView";
import UserModal from "@/components/modals/UserModal";
import {router} from 'expo-router';
import MyScrollView from "@/components/MyScrollView";

export default function usersdetailsscreen(){
    const {userId} = useLocalSearchParams();
    const [userForDetail, setUserForDetail] = useState<IUser>();
    const [users, setUsers] = useState<IUser[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        async function getData() {
            try{
                const data = await AsyncStorage.getItem("@UsersApp:users");
                const usersData:IUser[] = data != null ? JSON.parse(data) : [];
                setUsers(usersData);

                usersData.forEach((element) => {
                    if (element.id.toString() == userId){
                        setUserForDetail(element);
                    }
                });
            } catch(e){

            }
        }

        getData()
    }, [])

    const onAdd = async (email: string, password: string, id?: number) => {

        if (!id || id <= 0){
            const newUser: IUser = {
                id: Math.random() * 1000,
                email: email,
                password: password,
            };

            const userPlus: IUser[] = [
                ...users,
                newUser
            ];

            setUsers(userPlus);
            AsyncStorage.setItem("@UsersApp:users", JSON.stringify(userPlus))
        } else{
            users.forEach(user => {
                if (user.id == id){
                    user.email = email;
                    user.password = password;
                }
            });

            AsyncStorage.setItem("@UsersApp:users", JSON.stringify(users))
        }
        router.replace("/(tabs)/userlistscreen");
        setModalVisible(false)
    };

    const onDelete = () => {
        if (userForDetail){
            const newUsers: Array<IUser> = [];
            for (let index = 0; index < users.length; index++){
                const user = users[index];
                if (user.id != userForDetail!.id){
                    newUsers.push(user);
                }
            }
            setUsers(newUsers);
            AsyncStorage.setItem("@UsersApp:users", JSON.stringify(newUsers))
        }

        router.replace("/(tabs)/userlistscreen");
    };

    const openEditModal = (selectedUser: IUser) =>{
        setUserForDetail(selectedUser);
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false);
    }
    return(
        <MyScrollView headerBackgroundColor={{light: '#A1CEDC', dark:'#1D3d47'}}>
            <View style={styles.box}>
                <View>
                    <Text style={styles.text}>Email: {userForDetail ? userForDetail.email : ''}</Text>
                    <Text style={styles.text}>Password:{userForDetail ? userForDetail.password : ''}</Text>
                </View>

                <View style={styles.buttonRow}>
                      <ThemedView style={styles.buttonEdit}>
                        <TouchableOpacity onPress={() => openEditModal(userForDetail!)}>
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
            <UserModal
                visible={modalVisible}
                onCancel={closeModal}
                onAdd={onAdd}
                onDelete={onDelete}
                user={userForDetail}
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