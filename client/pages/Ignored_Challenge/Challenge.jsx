import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import AuthService from '../services/AuthService';

// import { storeToken } from '../services/JWTStorage';

export default function Challenge({ navigation }) {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [borderColor, setBorderColor] = useState();


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
                return (
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        {/* <Image source={require('../../assets/back_arrow.png')} /> */}

                    </TouchableOpacity>
                );

            },
        });
    }, [navigation]);
    return (
        <View style={styles.container}>
            <View style={styles.member}>
                <View style={styles.left}>
                    <View style={styles.name}>
                        <Text style={styles.name_text}>
                            T
                        </Text>

                    </View>
                </View>

                <View style={styles.right}>
                    <Text>Geno David</Text>
                    <View
                        style={
                            {
                                flexDirection: 'row'
                            }
                        }
                    >
                        <View
                            style={
                                {
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }
                            }
                        >
                            <Image
                                // source={require('../assets/user_role_icon.png')}
                            />
                            <Text style={styles.sub_content}>Admin</Text>
                        </View>

                        <View
                            style={
                                {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginLeft: 25
                                }
                            }
                        >
                            <Image
                                // source={require('../assets/rank_member_icon.png')}
                            />
                            <Text style={styles.sub_content}>0</Text>
                        </View>
                    </View>

                </View>

            </View>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center'
        // width: 100
    },

    name: {
        width: '80%',
        aspectRatio: 1,
        backgroundColor: '#98E3A8',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },


    member: {
        width: '95%',
        aspectRatio: 3.5,
        borderWidth: 1,
        borderColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: 'white'
    },

    name_text: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white'
    },

    right: {
        justifyContent: 'space-around',
        flex: 1,
        height: '85%',
        marginLeft: 7
    },

    left: {
        height: '100%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    sub_content: {
        marginLeft: 5
    }
});