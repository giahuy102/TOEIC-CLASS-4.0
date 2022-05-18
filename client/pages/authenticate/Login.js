import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';

import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthService from '../../services/AuthService';
import { storeToken } from '../../services/JWTStorage';

import { TextInput } from "react-native-paper";

import AppStyles from "../../styles/Login.scss";

export default function Login({ navigation }) {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [borderColor, setBorderColor] = useState();


    React.useLayoutEffect(() => {
        // navigation.setOptions({
        //     headerLeft: () => {
        //         // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
        //         return (
        //             <TouchableOpacity onPress={() => navigation.pop()}>
        //                 <Image source={require('../assets/back_arrow.png')} />

        //             </TouchableOpacity>
        //         );

        //     },
        // });
    }, [navigation]);


    const handleLogin = (event) => {
        event.preventDefault();
        AuthService.login(
            email, password
        ).then(response => {
            storeToken('jwt-token', response.data.accessToken);
            navigation.dispatch(state => {
                return CommonActions.reset({
                    index: 0,
                    routes: [{
                        name: 'ApplicationStackScreen',
                        state: {
                            routes: [{
                                name: 'MainTabScreen',
                                state: {
                                    routes: [{
                                        name: 'Profile',
                                        params: { username: response.data.username }
                                    }]
                                }
                            }]
                        }
                    }],
                })
            })
            // navigation.dispatch(state => {
            //     return CommonActions.reset({
            //         ...state,
            //         routes: [{
            //             name: 'ClassroomStackScreen',
            //             params: {
            //                 screen: 'MainTabScreen',
            //                 params: {
            //                     screen: 'Profile',
            //                     params: {
            //                         username: response.data.username,
            //                     }
            //                 }
            //             }
            //         }],
            //         index: 0,
            //     })
            // });

        }).catch(err => {
            console.warn(err);
        })
    }

    return (
        <>
            <View style={AppStyles.LoginHeaderView}>
                <Text style={AppStyles.LoginHeaderText}>
                    {"Hello\nWelcome Back !"}
                </Text>
            </View>
            <View style={AppStyles.container}>
                <TextInput
                    style={AppStyles.LoginTextInput}
                    placeholder='Enter email address'
                    keyboardType="email-address"
                    label="Email Address"
                    right={<TextInput.Icon name="email" />}
                    onChangeText={text => setEmail(text)}
                />

                <TextInput
                    style={AppStyles.LoginTextInput}
                    label="Password"
                    secureTextEntry
                    placeholder='Enter password'
                    right={<TextInput.Icon name="eye" />}
                    onChangeText={text => setPassword(text)}
                />
                <Pressable
                    style={AppStyles.LoginButton}
                    onPress={handleLogin}
                >
                    <Text style={[AppStyles.LoginButtonText, { width: 200, textAlign: 'center' }]}>Submit</Text>
                </Pressable>

                <Text style={AppStyles.LoginPromptToRegisterText}>Not having account yet! Register Now</Text>
                <Pressable
                    style={AppStyles.PromptToRegisterButton}
                    onPress={() => { navigation.navigate("Signup") }}
                >
                    <Text style={AppStyles.LoginButtonText}>Register</Text>
                </Pressable>
            </View>
        </>
    );
}

