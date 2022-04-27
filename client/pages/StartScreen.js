import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { loadToken } from '../services/JWTStorage';
import { storeOnboardingToken, isApplicationVisited } from '../services/OnboardingCheck';

import AuthService from '../services/AuthService';

import { useEffect } from 'react';
export default function StartScreen({ navigation }) {
  
  useEffect(() => {
    loadToken().then(value => {
      if (value) {
        AuthService.getUser(value)
          .then(response => {
            console.log(response.data);
            navigation.navigate('Homepage', {
              username: response.data
            });
          }).catch(err => {
            console.log(err);
          })
      }
    })

    const isOnboardingScreenOpen = async () => {
      const isOnboardingTriggered = await isApplicationVisited();
      console.log("isOnboardingScreenOpen visited answer", isOnboardingTriggered);
      if (!isOnboardingTriggered) {
        navigation.navigate('Onboarding1')
      }
    }

    isOnboardingScreenOpen();
  });

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          title="Login"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Sign up"
          onPress={() => navigation.navigate('Signup')}
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
  button: {
    margin: 10,
    width: "80%"

  }
});