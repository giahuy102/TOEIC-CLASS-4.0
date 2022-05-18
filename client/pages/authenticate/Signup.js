import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TextInput } from "react-native-paper";

import AuthService from '../../services/AuthService';

import AppStyles from "../../styles/Signup.scss";

export default function Singup({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    // const [successful, setSuccessful] = useState(true);
    // const [message, setMessage] = useState('');

    const handleRegister = (event) => {
        event.preventDefault();
        AuthService.register(
            username, email, password
        ).then(response => {
            // setSuccessful(true);
            navigation.navigate('Login');
            // navigate('/login');
        }).catch(err => {
            // console.log(4);
            // setSuccessful(false);
            // setMessage(err.response.data);
            console.warn(err.response.data);
            // console.log(3);
            // console.log(err);
        })
    }

    return (
        <>
            <View>
                <Text style={AppStyles.SignupHeaderText}>
                    {"Your Journey!\nStart Here"}
                </Text>
            </View>
            <View style={styles.container}>
                <TextInput
                    style={AppStyles.SignupTextInput}
                    placeholder='Enter username'
                    label="Username"
                    right={<TextInput.Icon name="account" />}
                    onChangeText={text => setUsername(text)}
                />

                <TextInput
                    style={AppStyles.SignupTextInput}
                    placeholder='Enter email address'
                    label="Email Address"
                    keyboardType="email-address"
                    right={<TextInput.Icon name="email" />}
                    onChangeText={text => setEmail(text)}
                />

                <TextInput
                    style={AppStyles.SignupTextInput}
                    secureTextEntry
                    placeholder='Enter password'
                    label="Password"
                    right={<TextInput.Icon name="eye" />}
                    onChangeText={text => setPassword(text)}
                />
                <View style={styles.button}>
                    <Pressable
                        style={AppStyles.SignupButton}
                        onPress={handleRegister}
                    >
                        <Text style={AppStyles.SignupButtonText}>Submit</Text>
                    </Pressable>
                </View>

            </View>
        </>
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