import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthService from '../../../services/AuthService';

import { storeToken } from '../../../services/JWTStorage';

import data from '../../Ignored_Challenge/RESULT_DATA.json'


export default function ChallengeResult({ navigation }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
                return (
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={require('../../../assets/back_arrow.png')} />

                    </TouchableOpacity>
                );

            },
        });
    }, [navigation]);

    const FlatListItem = (item, index) => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', width: '95%', marginTop: 20 }}>
                <Text style={{ color:'red', fontWeight:'bold', textAlign:'center', width: '10%' }} >{item.key}</Text>
                <Text style={{ textAlign:'center', width: '45%' }}>{item.name}</Text>
                <Text style={{ textAlign:'center', width: '35%' }}>{item.id}</Text>
                <Text style={{ textAlign:'center', width: '10%' }}>{item.score}</Text>
            </View>
        );
    }

    const FlatListHeader = (item, index) => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', width: '95%', marginTop: 20 }}>
                <Text style={{ textAlign:'center', width: '15%', color: '#1570EF', fontWeight: 'bold', fontSize: 17 }}>{item.key}</Text>
                <Text style={{ textAlign:'center', width: '40%', color: '#1570EF', fontWeight: 'bold', fontSize: 17 }}>{item.name}</Text>
                <Text style={{ textAlign:'center', width: '30%', color: '#1570EF', fontWeight: 'bold', fontSize: 17 }}>{item.id}</Text>
                <Text style={{ textAlign:'center', width: '15%', color: '#1570EF', fontWeight: 'bold', fontSize: 17 }}>{item.score}</Text>
            </View>
        );
    }

    const header_data = [{ "key": "Rank", "name": "Name", "id": "ID", "score": "Score" }];

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 10, }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Challenge: <Text style={{ fontWeight: 'normal' }}>Toiec 500+</Text> </Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>ID: <Text style={{ fontWeight: 'normal' }}>1910409</Text> </Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Ended: <Text style={{ fontWeight: 'normal' }}>23h59, 23rd March 2022</Text> </Text>
            </View>

            <FlatList
                style={{ height: '10%' }}
                data={header_data}
                renderItem={({ item, index }) => {
                    // console.log(`item = ${JSON.stringify(item)}, index = ${index}`)
                    return (
                        FlatListHeader(item, index)
                    );
                }}
            >

            </FlatList>

            <FlatList
                data={data}
                renderItem={({ item, index }) => {
                    // console.log(`item = ${JSON.stringify(item)}, index = ${index}`)
                    return (
                        FlatListItem(item, index)
                    );
                }}
            >

            </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center'
        // width: 100
    }
});