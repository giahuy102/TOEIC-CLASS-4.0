import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';

import { NavigationContainer, NavigationHelpersContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Exams({ navigation, route }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
                return (
                    <TouchableOpacity onPress={() => navigation.navigate({
                        name: 'NewExam',
                        params: {
                            ...route.params,
                            // keyStack: route.params.keyStack.splice(-1)
                        },
                        merge: true
                    })}>
                        <Image source={require('../../../assets/back_arrow.png')} />

                    </TouchableOpacity>
                );

            },
        });
    }, [navigation, route.params]);

    const handleAddSection = () => {
        // navigation.setParams({
        //     ...route.params,
        //     score: 67
        // })
        //   navigation.setParams({
        //     ...route.params,
        //     sections: [
        //       ...route.params.sections,
        //       {
        //         key: route.params.sections.length,
        //         section_question: 'fsfsffffffffffffdfdfdfdffd',
        //         images: [
        //           // ...route.params.sections[route.params.sections.length - 1].images,
        //           {

        //             key: 0,
        //             path: null //image object, not a string
        //           }
        //         ]
        //       }
        //     ]
        //   });
        navigation.navigate('NewSection', {
            testData: {
                ...route.params.testData,
                sections: [
                    ...route.params.testData.sections,
                    {
                        key: route.params.testData.sections.length,
                        section_question: '',
                        images: [
                            {
                                key: 0,
                                remotePath: null,
                                localPath: null,
                                type: null,
                                // base64: null
                            }
                        ],
                        questions: [

                        ]
                        
                    }
                ]
            },
            keyStack: [...route.params.keyStack, route.params.testData.sections.length]
        });

    }
    // const test = () => {
    //     navigation.setParams({
    //         ...route.params,
    //         score: 67
    //     })
    // }

    const handleUpdate = (key) => {
        navigation.navigate('NewSection', {
            ...route.params,
            keyStack: [...route.params.keyStack, key]
        });
    }

    const handleDelete = (key) => {
        let newSections = [...route.params.testData.sections];
        newSections.splice(key, 1);
        for (let i = key; i < newSections.length; i++) {
            newSections[i].key = i;
        } 
        navigation.setParams({
            ...route.params,
            testData: {
                ...route.params.testData,
                sections: newSections
            }
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={
                    {
                        alignItems: 'center'
                    }
                }
            >
                {
                    route.params.testData.sections.map((item, index) => {
                        return <View

                            key={item.key}
                            style={
                                {
                                    backgroundColor: 'white',
                                    height: 80,
                                    justifyContent: 'center',
                                    padding: 5,
                                    marginTop: 5,
                                    marginBottom: 5,
                                    width: '85%'
                                }
                            }

                        >
                            <View
                            style={
                                {
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }
                            }
                            
                            >
                            <Image
                                source={require('../../../assets/globe.png')}
                            />

                            <View>
                                <Text
                                style={
                                    {
                                        marginLeft: 10
                                    }
                                }
                                
                                >
                                Section {item.key + 1}
                                
                                </Text>
                            </View>
                            </View>
                            <View
                            style={
                                {
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end'
                                }
                            }
                            
                            >
                            <TouchableOpacity
                                onPress={() => handleUpdate(item.key)}
                            >
                                <Text
                                style={
                                    {
                                    marginRight: 25
                                    }
                                }
                                
                                >
                                Edit
                                </Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                onPress={() => handleDelete(item.key)}
                            >
                                <Text
                                style={
                                    {
                                    marginRight: 20
                                    }
                                }
                                >
                                Delete
                                </Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    })
                }
            </ScrollView>


            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={handleAddSection}
            >
                <Image
                    style={styles.floatingButton}
                    source={require('../../../assets/plus.png')}
                />

            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
        // width: 100
    },



    touchableOpacity: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    floatingButton: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    }
});