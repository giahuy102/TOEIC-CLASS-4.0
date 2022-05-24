import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';


import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { loadEmail, loadToken, storeEmail } from '../services/JWTStorage';
import { storeOnboardingToken, isApplicationVisited } from '../services/OnboardingCheck';
import AuthService from '../services/AuthService';

import { updateProfileState } from "./application/profile/slice/profileSlice";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

// const BASE_API_URL = `http://localhost:${3001}`;
// const CHALLENGE_PREFIX = '/api/challenge';
// const CHALLENGE_ENDPOINT = {
//   GET_ALL_CHALLENGE: 'challenges'
// }

// const AUTH_PREFIX = "/api/user";
// const AUTH_ENDPOINT = {
//   LOGIN: "/login",
//   REGISTER: "/register"
// }

// const REGISTER_ENDOPINT = `${BASE_API_URL}${AUTH_PREFIX}${AUTH_ENDPOINT.REGISTER}`

export default function StartScreen({ navigation }) {
  // useEffect(() => {
  //   // storeEmail("hahah@gmail.com")
  //   axios.get(BASE_API_URL + CHALLENGE_PREFIX + '/challenges')
  //     .then(res => {
  //       console.log("get all challenges successfully")
  //     })
  // })

  const dispatch = useDispatch();

  useEffect(() => {

    // console.log("EMAIL: ", emailStored);

    const isUserLogin = async () => {
      // const emailStored = loadEmail();

      const loadTokenResponse = await loadToken();

      if (loadTokenResponse) {
        try {
          // console.log("load token in try: ", loadTokenResponse)
          const authServiceResponse = await AuthService.getUser(loadTokenResponse);
          const userData = authServiceResponse.data;
          // console.log("user data: ", userData)
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
          console.log("JWT Token invalid, must relogin");
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
      {/* <View style={styles.button}>
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

      <View style={styles.button}>
        <Button
          title="Doing test"
          onPress={() => navigation.navigate('ChallengeDoingSection')}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Exams"
          onPress={() => navigation.navigate('Exams')}
        />
      </View>

      {/* <View style={styles.button}>
        <Button
          title="NewQuestion"
          onPress={() => navigation.navigate('NewQuestion')}
        />
      </View> */}

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