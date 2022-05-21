import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import data from '../../Ignored_Challenge/DATA.json'
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { loadUpcomingChallengesList } from './slice/challengesListSlice';

const BASE_API_URL = `http://10.0.2.2:${3001}`;
const CHALLENGE_PREFIX = '/api/challenge';

export default function ChallengeUpcoming({ navigation, route }) {
    const { classId } = route.params;
    const dispatch = useDispatch();

    const challengesList = useSelector(state => state.challengesList.upcomingChallengesList);
    // const [challengesList, setChallengesList] = useState([])

    useEffect(async () => {
        await axios.get(BASE_API_URL + CHALLENGE_PREFIX + `/get_challenges_upcoming/${classId}`)
            .then(res => {
                console.log('Challenge Upcoming load challenges list response data', res.data);
                dispatch(loadUpcomingChallengesList(res.data));
            })
            .catch((err) => {
                console.log("Error: ", err)
            })
    }, [])

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
            // <TouchableOpacity style={styles.member} onPress={() => navigation.navigate('ChallengeTest', item)}>
            <TouchableOpacity style={styles.member} onPress={() => navigation.pop()}>
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
                onPress={() => navigation.navigate('ChallengeCreate', { type: 'upcoming', classId })}
            >
                <Image
                    style={styles.floatingButton}
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