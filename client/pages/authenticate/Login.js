import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';

import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthService from '../../services/AuthService';
import { storeToken } from '../../services/JWTStorage';

import { TextInput } from "react-native-paper";

import AppStyles from "../../styles/SystemFontStyles.scss";

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
                        name: 'ClassroomsStackScreen',
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
            // navigation.navigate("ClassroomsStackScreen", {
            //         screen: 'MainTabScreen',
            //         params: {
            //             screen: 'Profile',
            //             params: {
            //                 username: response.data.username,
            //             }
            //         }
            //     }
            // );
        }).catch(err => {
            console.warn(err);
        })
    }

    return (
        <>
            <View><Text style={AppStyles.LoginHeaderText}>
                {"Hello\nWelcome Back !"}
            </Text></View>
            <View style={styles.container}>
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
                <View style={styles.button}>
                    <Button
                        title="Submit"
                        onPress={handleLogin}
                    />
                </View>

                <Text style={AppStyles.LoginPromptToRegisterText}>Not having account yet! Register Now</Text>
                <Button
                    title={"Register Here"}
                    onPress={() => { navigation.navigate("Signup") }}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // width: 100
    },
    input: {
        width: '80%',
        height: 60,
        margin: 10,
        fontSize: 16,
    },
    button: {
        margin: 10,
        width: 300

    }
});