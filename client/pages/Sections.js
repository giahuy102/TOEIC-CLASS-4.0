import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, FlatList, Alert } from 'react-native';

import { NavigationContainer, NavigationHelpersContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Exams({navigation, route}) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
                return (
                    <TouchableOpacity onPress={() => navigation.navigate({
                        name: 'NewExam',
                        params: route.params,
                        merge: true
                    })}>
                        <Image source={require('../assets/back_arrow.png') }/>

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
        navigation.navigate('NewSection', route.params);
        
    }
    const test = () => {
        navigation.setParams({
            ...route.params,
            score: 67
        })
    }

    return (
        <View style={styles.container}>
            {
                route.params.sections.map((item, index) => {
                    return <Text>{item.key}</Text>
                })
            }

            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={handleAddSection}
            >
                <Image
                    style={styles.floatingButton}
                    // source={{ uri: 'https://github.com/tranhonghan/images/blob/main/plus_icon.png?raw=true' }}
                    // source={IMAGENAME}
                    source={require('../assets/plus.png')}
                />

            </TouchableOpacity>
        </View>
    );
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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