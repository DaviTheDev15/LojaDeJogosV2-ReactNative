import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import User from '@/components/entities/User';
import MyScrollView from '@/components/MyScrollView';
import {useEffect, useState} from 'react';
import { IUser } from '@/components/interfaces/IUser';
import UserModal from '@/components/modals/UserModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';


export default function SaleListScreen(){
    const [users, setUsers] = useState<IUser[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<IUser>();
    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        async function getData() {
            try{
                const data = await AsyncStorage.getItem("@UsersApp:users");
                const usersData = data != null ? JSON.parse(data) : [];
                setUsers(usersData);
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

    const onAdd = async (email: string, password: string,id?: number) => {

        if(!id || id <= 0){
            const newUser: IUser = {
                id: Math.random() * 1000,
                email: email,
                password: password
            };

            const userPlus: IUser[] = [
                ...users,
                newUser
            ];
            setUsers(userPlus);
            AsyncStorage.setItem("@UsersApp:users", JSON.stringify(userPlus))
        } else {
            users.forEach(user => {
                if (user.id == id){
                    user.email = email;
                    user.password = password;
                }
            });
            AsyncStorage.setItem("@UsersApp:users", JSON.stringify(users))
        }
        setModalVisible(false)
    };

        const onDelete = (id: number) => {
            const newUsers: Array<IUser> = [];
            for (let index = 0; index < users.length; index++){
                const user = users[index]
                if (user.id != id){
                    newUsers.push(user);
                }
            }
    
            setUsers(newUsers);
            AsyncStorage.setItem("@UsersApp:users", JSON.stringify(users))
            setModalVisible(false)
        }
    
    const openModal = () => {
        setSelectedUser(undefined);
        setModalVisible(true);
    }

    const openEditModal = (selectedUser: IUser) =>{
        setSelectedUser(selectedUser);
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <MyScrollView headerBackgroundColor={{light: '#A1CEDC', dark:'#1D3d47'}}>
            <ThemedView style={styles.headerContainer}>
                <TouchableOpacity onPress={() => openModal()}>
                    <Text style={styles.headerButton}>Add New User</Text>
                </TouchableOpacity>
            </ThemedView>
            {users.map(user => (
                <ThemedView key={user.id} style={styles.itemContainer}>
                    <TouchableOpacity onPress={() => openEditModal(user)}>
                        <User
                            email={user.email}
                            senha={user.password}
                        />
                    </TouchableOpacity>
                </ThemedView>
            ))}
            <Text style={styles.text}>{text}</Text>
            <UserModal
                visible={modalVisible}
                onCancel={closeModal}
                onAdd={onAdd}
                onDelete={onDelete}
                user={selectedUser}
            />
        </MyScrollView>
    )
}

const styles = StyleSheet.create({
    headerContainer:{
        backgroundColor: 'rgb(22, 109, 136)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:5,
        borderRadius:10,
        margin:10,
    },
    headerButton:{
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 10,
        marginTop:50,
        color: 'white'
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
    },
})