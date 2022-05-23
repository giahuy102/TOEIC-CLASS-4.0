import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthService from '../services/AuthService';

import { storeToken } from '../services/JWTStorage';


import SectionImageTitle from '../components/SectionImageTitle'

export default function Login({navigation, route}) {
    

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
                return (
                    <TouchableOpacity onPress={() => navigation.navigate({
                      name: 'NewSection',
                      params: route.params,
                      merge: true
                    })}>
                        <Image source={require('../assets/back_arrow.png') }/>

                    </TouchableOpacity>
                );
                
            },
        });
    }, [navigation, route.params]);

    React.useEffect(() => {
        const idx = route.params.sections.length - 1;
      
        let newSections = [...route.params.sections];
        newSections[idx].questions = [...newSections[idx].questions, {
            key: newSections[idx].questions.length,
            question: '',
            answers: [
                {
                    key: 0,
                    answer: '', 
                    isCorrect: true
                },
                {
                    key: 1,
                    answer: '', 
                    isCorrect: false
                },
                {
                    key: 2,
                    answer: '', 
                    isCorrect: false
                },
                {
                    key: 3,
                    answer: '', 
                    isCorrect: false
                }
            ]
        }]; 
        navigation.setParams({
            ...route.params,
            sections: newSections
        })
    }, [])



    return (
        <View style={styles.container}>

        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
    // width: 100
  },
  
  name: {
    width:'80%',
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
  },

  navigator: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  input: {
    // width: 500,
    backgroundColor: '#E4E7EC',
    // height: '90%',
    width: '85%',
    height: 350,
    marginTop: 20
  },
  touchableOpacity: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
      flexDirection: 'row'
  },
  floatingButton: {
      resizeMode: 'contain',
      width: 50,
      height: 50,
  }

});