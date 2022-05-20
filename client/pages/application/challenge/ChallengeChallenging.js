import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';


import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import data from '../../Ignored_Challenge/DATA.json'
import axios from 'axios';
import ClassroomDetailScreen from '../classrooms/ClassroomDetailScreen';

const BASE_API_URL = `http://10.0.2.2:${3001}`;
const CHALLENGE_PREFIX = '/api/challenge';

export default function ChallengeChallenging({ navigation }) {
    const [challengesList, setChallengesList] = useState([])
    useEffect(async () => {
        await axios.get(BASE_API_URL + CHALLENGE_PREFIX + '/get_challenges_challenging')
            .then(res => {
                setChallengesList(res.data)
            })
            .catch((err) => {
                console.log("Error: ", err)
            })
    }, [])


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return (
                    // <TouchableOpacity onPress={() => navigation.pop()}>
                    <TouchableOpacity onPress={() => navigation.push('ClassroomDetailScreen', 1)}>

                        <Image source={require('../../../assets/back_arrow.png')} />

                    </TouchableOpacity>
                );

            },
        });
    }, [navigation]);

    const FlatListItem = (item, index) => {
        return (
            <TouchableOpacity style={styles.member} onPress={() => navigation.navigate('ChallengeTest', item)}>
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
                    <Text style={{ paddingTop: 10 }}>ID: {item.challenge_id}</Text>
                    <Text>Created by: {item.created_by}</Text>
                    <Text>Will end: {new Date(item.end).toLocaleString()}</Text>
                </View>

            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={challengesList}
                renderItem={({ item, index }) => {
                    // console.log(`item = ${JSON.stringify(item)}, index = ${index}`)
                    return (
                        FlatListItem(item, index)
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
            >
            </FlatList>

            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => navigation.navigate('ChallengeCreate')}
            >
                <Image
                    style={styles.floatingButton}
                    // source={{ uri: 'https://github.com/tranhonghan/images/blob/main/plus_icon.png?raw=true' }}
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