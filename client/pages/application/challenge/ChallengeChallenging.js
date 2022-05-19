import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import data from '../../Ignored_Challenge/DATA.json'
// import { IMAGENAME } from './Challenge/assets'

export default function ChallengeChallenging({ navigation }) {

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
            <TouchableOpacity style={styles.member} onPress={() => navigation.navigate('ChallengeTest')}>
                <View style={styles.left}>
                    <View style={{
                        width: '80%',
                        aspectRatio: 1,
                        backgroundColor: index % 3 == 0 ? '#96ECEC' : (index % 3 == 1 ? '#98E3A8' : '#B98DDC'),
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.name_text}>
                            T
                        </Text>

                    </View>
                </View>

                <View style={styles.right}>
                    {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: '-2%' }}>
                        <Text>{item.name}</Text>
                        <Text onPress={() => navigation.navigate('ChallengeResult')} style={{ color: '#1570EF', textDecorationLine: 'underline' }}>
                            View result
                        </Text>
                    </View> */}

                    <Text style={{ paddingTop: 10 }}>ID: {item.id}</Text>
                    <Text>Created by: {item.created_by}</Text>
                    <Text>Will end: {item.will_end}</Text>
                </View>

            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
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

            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => navigation.navigate('ChallengeCreate')}
            >
                <Image
                    style={styles.floatingButton}
                    // source={{ uri: 'https://github.com/tranhonghan/images/blob/main/plus_icon.png?raw=true' }}
                    // source={IMAGENAME}
                    source={require('../../Ignored_Challenge/assets/plus.png')}
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

    name: {
        width: '80%',
        aspectRatio: 1,
        backgroundColor: '#98E3A8',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },


    member: {
        width: '97%',
        aspectRatio: 3.5,
        borderWidth: 0,
        borderColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: 'white',
        paddingRight: 10
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