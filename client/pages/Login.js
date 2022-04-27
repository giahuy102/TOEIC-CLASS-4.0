import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthService from '../services/AuthService';

import { storeToken } from '../services/JWTStorage';

export default function Login({ navigation }) {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [borderColor, setBorderColor] = useState();


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
                return (
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={require('../assets/back_arrow.png')} />

                    </TouchableOpacity>
                );

            },
        });
    }, [navigation]);


    const handleLogin = (event) => {
        event.preventDefault();
        AuthService.login(
            email, password
        ).then(response => {
            // if (response.data.accessToken) {
            //     localStorage.setItem("user", JSON.stringify(response.data));
            // }


            console.log(response.data.accessToken);
            storeToken('jwt-token', response.data.accessToken);
            navigation.navigate('Homepage', { username: response.data.username });
            // navigate('/');
            // console.log(response.data);
        }).catch(err => {
            // console.log(4);
            // setSuccessful(false);
            // setMessage(err.response.data);
            console.warn(err);
        })
        // navigation.navigate('Homepage');
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Enter email address'
                onChangeText={text => setEmail(text)}
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder='Enter password'
                onChangeText={text => setPassword(text)}
            />
            <View style={styles.button}>
                <Button
                    title="Submit"
                    onPress={handleLogin}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
        // width: 100
    },
    input: {

        borderWidth: 1,
        borderColor: "thistle",
        width: 300,
        height: 50,
        margin: 10,
        fontSize: 16,
        paddingLeft: 20,
        paddingRight: 20
    },
    button: {
        margin: 10,
        width: 300

    }
});