import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthService from '../../../services/AuthService';

import { storeToken } from '../../../services/JWTStorage';


import SectionImageTitle from '../../../components/SectionImageTitle'

export default function Login({navigation, route}) {
    

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
                return (
                    <TouchableOpacity onPress={() => navigation.navigate({
                        name: 'NewSection',
                        params: {
                            ...route.params,
                            keyStack: route.params.keyStack.slice(0, -1)
                        },
                        merge: true
                    })}>
                        <Image source={require('../../../assets/back_arrow.png') }/>

                    </TouchableOpacity>
                );
                
            },
        });
    }, [navigation, route.params]);

    const handleSetText = (text, type, key = null) => {
        const sectionIdx = route.params.keyStack[route.params.keyStack.length - 2];
        const questionIdx = route.params.keyStack[route.params.keyStack.length - 1];
        let newParam = {...route.params};
        if (type == 'question') {
            newParam.testData.sections[sectionIdx].questions[questionIdx].question = text;
        }
        else if (type == 'answer') {
            newParam.testData.sections[sectionIdx].questions[questionIdx].answers[key].answer = text;
        }
        navigation.setParams(newParam);
    }

    React.useEffect(() => {
        // const idx = route.params.sections.length - 1;
      
        // let newSections = [...route.params.sections];
        // newSections[idx].questions = [...newSections[idx].questions, {
        //     key: newSections[idx].questions.length,
        //     question: '',
        //     answers: [
        //         {
        //             key: 0,
        //             answer: '', 
        //             isCorrect: true
        //         },
        //         {
        //             key: 1,
        //             answer: '', 
        //             isCorrect: false
        //         },
        //         {
        //             key: 2,
        //             answer: '', 
        //             isCorrect: false
        //         },
        //         {
        //             key: 3,
        //             answer: '', 
        //             isCorrect: false
        //         }
        //     ]
        // }]; 
        // navigation.setParams({
        //     ...route.params,
        //     sections: newSections
        // })

        // console.log(route.params.testData.sections[route.params.keyStack[route.params.keyStack.length - 2]].questions[route.params.keyStack[route.params.keyStack.length - 1]])
        console.log(route.params.keyStack)
    }, [])



    return (
        <View style={styles.container}>
            <View style={
                {
                    width: '90%'
                }
            }>
                <Text
                    style={
                        {
                            fontSize: 22
                        }
                    }
                >Tap to enter
                
                </Text>
                <TextInput 
                    placeholder='Question'
                    textAlign={'center'}
                    placeholderTextColor={'black'}
                    value={route.params.testData.sections[route.params.keyStack[route.params.keyStack.length - 2]].questions[route.params.keyStack[route.params.keyStack.length - 1]].question}
                    onChangeText={(text) => handleSetText(text, 'question')}
                    style={
                        {
                            alignContent: 'center',
                            fontSize: 30
                        }
                    }
                />
                

                <View
                    style={
                        {
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 60,
                            width: '90%'
                            
                        }
                    }
                >
                    <Image 
                        source={require('../../../assets/right_check.png')}
                    />
                    <TextInput 
                        placeholder='Correct answer'
                        placeholderTextColor={'black'}
                        value={route.params.testData.sections[route.params.keyStack[route.params.keyStack.length - 2]].questions[route.params.keyStack[route.params.keyStack.length - 1]].answers[0].answer}
                        onChangeText={(text) => handleSetText(text, 'answer', 0)}    
                        style={
                            {
                                alignContent: 'center',
                                fontSize: 21,
                                marginLeft: 10,
                                // width: '100%'
                            }
                        }
                    />
                </View>

                <View
                    style={
                        {
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 50,
                            width: '90%'
                            
                        }
                    }
                >
                    <Image 
                        source={require('../../../assets/wrong_check.png')}
                    />
                    <TextInput 
                        placeholder='Wrong answer'
                        placeholderTextColor={'black'}
                        value={route.params.testData.sections[route.params.keyStack[route.params.keyStack.length - 2]].questions[route.params.keyStack[route.params.keyStack.length - 1]].answers[1].answer}
                        onChangeText={(text) => handleSetText(text, 'answer', 1)}    
                        style={
                            {
                                alignContent: 'center',
                                fontSize: 21,
                                marginLeft: 10,
                                // width: '100%'
                            }
                        }
                    />
                </View>

                <View
                    style={
                        {
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 50,
                            width: '90%'
                            
                        }
                    }
                >
                    <Image 
                        source={require('../../../assets/wrong_check.png')}
                    />
                    <TextInput 
                        placeholder='Wrong answer'
                        placeholderTextColor={'black'}
                        value={route.params.testData.sections[route.params.keyStack[route.params.keyStack.length - 2]].questions[route.params.keyStack[route.params.keyStack.length - 1]].answers[2].answer}
                        onChangeText={(text) => handleSetText(text, 'answer', 2)}    
                        style={
                            {
                                alignContent: 'center',
                                fontSize: 21,
                                marginLeft: 10,
                                // width: '100%'
                            }
                        }
                    />
                </View>

                <View
                    style={
                        {
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 50,
                            width: '90%'
                            
                        }
                    }
                >
                    <Image 
                        source={require('../../../assets/wrong_check.png')}
                    />
                    <TextInput 
                        placeholder='Wrong answer'
                        placeholderTextColor={'black'}
                        value={route.params.testData.sections[route.params.keyStack[route.params.keyStack.length - 2]].questions[route.params.keyStack[route.params.keyStack.length - 1]].answers[3].answer}
                        onChangeText={(text) => handleSetText(text, 'answer', 3)}    
                        style={
                            {
                                alignContent: 'center',
                                fontSize: 21,
                                marginLeft: 10,
                                // width: '100%'
                            }
                        }
                    />
                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
    // width: 100
    justifyContent: 'center',
    alignItems: 'center',
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