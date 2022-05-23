import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, FlatList, Alert } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Exams({navigation}) {
    React.useLayoutEffect(() => {
        
        navigation.setOptions({
            headerLeft: () => {
                // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
                return (
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={require('../assets/back_arrow.png') }/>

                    </TouchableOpacity>
                );
                
            },
        });
    }, [navigation]);
    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => navigation.navigate('NewExam')}
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