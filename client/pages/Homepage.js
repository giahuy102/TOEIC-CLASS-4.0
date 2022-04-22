import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import {removeKey} from '../services/JWTStorage'
export default function Homepage({route, navigation}) {
    const {username} = route.params;

    const handleLogout = () => {
        removeKey('jwt-token');
        navigation.popToTop();
    }
    return (
        <View style={ {flex: 1, justifyContent: "center", alignItems: "center"} }>
            <Text style={styles.text}>Hello {username}</Text>

            <View style={styles.button}>
                <Button 
                    title="Logout"
                    onPress={handleLogout}
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
      
  },
  text: {
      fontSize: 25,
      backgroundColor: "rgb(36, 120, 129)",
      color: 'white',
      width: 300,
      textAlign: "center",
      padding: 30
  }
});