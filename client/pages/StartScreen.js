import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';


import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { loadToken } from '../services/JWTStorage';
import { storeOnboardingToken, isApplicationVisited } from '../services/OnboardingCheck';
import AuthService from '../services/AuthService';

import { updateProfileState } from "./application/profile/slice/profileSlice";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
export default function StartScreen({ navigation }) {

  const dispatch = useDispatch();

  useEffect(() => {
    const isUserLogin = async () => {
      const loadTokenResponse = await loadToken();
      if (loadTokenResponse) {
        try {
          const authServiceResponse = await AuthService.getUser(loadTokenResponse);
          const userData = authServiceResponse.data;
          dispatch(updateProfileState(userData));
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
                        params: userData 
                      }]
                    }
                  }]
                }
              }]
            })
          })
          return;
        } catch (err) {
          console.log("Error caught successfully");
          await isOnboardingScreenOpen();
        }
      } else {
        await isOnboardingScreenOpen();
      }
    }

    const isOnboardingScreenOpen = async () => {
      const isOnboardingTriggered = await isApplicationVisited();
      console.log("isOnboardingScreenOpen visited answer", isOnboardingTriggered);
      if (!isOnboardingTriggered) {
        navigation.navigate('Onboarding1')
      }
    }

    /**
     * Comment below line to check all Start Screen demo
     */
    isUserLogin();


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

      <View style={styles.button}>
        <Button
          title="Class Members"
          onPress={() => navigation.navigate('ClassMember')}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="New section"
          onPress={() => navigation.navigate('NewSection')}
        />
      </View>

      {/* <View style={styles.button}>
        <Button
          title="Challenge"
          onPress={() => navigation.navigate('Challenge')}
        />
      </View> */}

      <View style={styles.button}>
        <Button
          title="Challenge"
          onPress={() => navigation.navigate('ChallengeScreen')}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Your Result"
          onPress={() => navigation.navigate('YourResult')}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Profile"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>

    </View >

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