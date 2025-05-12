import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import User from '@/components/entities/User';
import MyScrollView from '@/components/MyScrollView';
import {useEffect, useState} from 'react';
import { IUser } from '@/components/interfaces/IUser';
import UserModal from '@/components/modals/UserModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserListScreen(){
    const [user, setUser] = useState<IUser[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<IUser>();

    useEffect(() => {
        async function getData() {
            try{
                const data = await AsyncStorage.getItem("@UserApp:user");
                const usersData = data != null ? JSON.parse(data) : [];
                setUser(usersData);
            } catch (e){

            }
        }

        getData();
    }, [])

    const onAdd = async (email:string, password:string , id?: number) => {

        if(!id || id <= 0){
            const newUser: IUser = {
                id: Math.random() * 1000,
                email: email,
                password: password
            };

            const userPlus: IUser[] = [
                ...user,
                newUser
            ];
            setUser(userPlus);
            AsyncStorage.setItem("@UserApp:user", JSON.stringify(userPlus))
        } else {
            user.forEach(u => {
                if (u.id == id){
                    u.email = email;
                    u.password = password;
                }
            });
            AsyncStorage.setItem("@UserApp:user", JSON.stringify(user))
        }
        setModalVisible(false)
    };

        const onDelete = (id: number) => {
            const newUser: Array<IUser> = [];
            for (let index = 0; index < user.length; index++){
                const u = user[index]
                if (u.id != id){
                    newUser.push(u);
                }
            }
    
            setUser(newUser);
            AsyncStorage.setItem("@UserApp:sales", JSON.stringify(user))
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
            <ThemedView style={styles.container}>
                {user.map(u => <TouchableOpacity key={u.id} onPress={() => openEditModal(u)}>
                    <User email={u.email} senha={u.password} />
                </TouchableOpacity>)}
                
            </ThemedView>
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
    titleContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer:{
        gap: 8,
        marginBottom: 8,
    },
    reactLogo:{
        bottom: 0,
        left: 0,
    },
    container:{
        flex:1,
        backgroundColor: '#005C53',
    },
    headerContainer:{
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerButton:{
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 20,
        marginTop:50    
    },
})