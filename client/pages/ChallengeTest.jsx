import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, TouchableHighlight, FlatList } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthService from '../services/AuthService';

import { storeToken } from '../services/JWTStorage';

import data from './Challenge/TEST_DATA.json'


export default function ChallengeTest({ navigation }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
                return (
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={require('../assets/back_arrow.png')} />

                    </TouchableOpacity>
                );

            },
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 20, borderWidth: 2, borderColor: '#1570EF', borderRadius: 5, padding: 15 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Challenge: <Text style={{ fontWeight: 'normal' }}>{data[0].name}</Text> </Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>ID: <Text style={{ fontWeight: 'normal' }}>{data[0].id}</Text> </Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Start time: <Text style={{ fontWeight: 'normal' }}>{data[0].start_time}</Text> </Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>End time: <Text style={{ fontWeight: 'normal' }}>{data[0].end_time}</Text> </Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Score: <Text style={{ fontWeight: 'normal' }}>{data[0].score}</Text> </Text>
            </View>

            <View style={{ marginTop: 40, width: '25%' }}>
                {data[0].score != "none" ?
                    <Button
                        borderRadius='10'
                        color="#1570EF"
                        title='Start'
                        onPress={() => navigation.navigate('Login')}
                    />
                    :
                    <Button
                        borderRadius='10'
                        color="#1570EF"
                        title='Done'
                        onPress={() => navigation.navigate('Login')}
                    />
                }
            </View>
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

});