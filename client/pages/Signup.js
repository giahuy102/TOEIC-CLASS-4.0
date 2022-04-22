import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthService from '../services/AuthService';

export default function Singup({navigation}) {
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
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder='Enter username'
                onChangeText={ text => setUsername(text) }
            />

            <TextInput 
                style={styles.input}
                placeholder='Enter email address'
                onChangeText={ text => setEmail(text) }
                keyboardType="email-address"
            />

            <TextInput 
                style={styles.input}
                secureTextEntry={true}
                placeholder='Enter password'
                onChangeText={ text => setPassword(text) }
            />
            <View style={styles.button}>
                <Button 
                    title="Submit"
                    onPress={handleRegister}
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