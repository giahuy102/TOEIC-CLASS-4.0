import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import axios from 'axios';

export default function Exams({ navigation }) {
    const [testData, setTestData] = useState(null);

    const handleNavigation = (item = null) => {
        if (!item) {
            navigation.navigate('NewExam', {
                testData: {
                    type: 'Reading',
                    audio: null,
                    title: '',
                    duration: '',
                    score: '',
                    sections: [

                    ]
                },
                keyStack: [null]
            })
        }
        else {
            navigation.navigate('NewExam', {
                testData: { ...item },
                keyStack: [item._id]
            })
        }
    }

    const handleDelete = (id) => {
        axios.post('http://10.0.2.2:3001/api/test/' + id + '/delete')
            .then(res => {
                getTestData();
            })
            .catch(err => {
                console.log(err);
            })
    }

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

    const getTestData = () => {
        axios.get('http://10.0.2.2:3001/api/test/get_all_test')
            .then(function (res) {
                setTestData(res.data);
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getTestData();
        });
        return unsubscribe;
    }, [navigation])

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
                    testData &&
                    testData.map((item, index) => {
                        return <View

                            key={item._id}
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
                                        {item.title}

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
                                    onPress={() => handleNavigation(item)}
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
                                    onPress={() => handleDelete(item._id)}
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
                onPress={() => handleNavigation()}
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