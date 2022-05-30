import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, FlatList, Alert } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import data from '../../Ignored_Challenge/DATA.json'
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

export default function NewExam({ navigation, route }) {
    const handleSaveData = () => {
        // console.log(route.params.type)
        // console.log(route.params)
        if (route.params) {
            const data = new FormData();
            // data.append('type', route.params.type);
            // data.append('title', route.params.title);
            // data.append('duration', route.params.duration);
            // data.append('score', route.params.score);

            // let newSections = []
            // route.params.sections.map((item, index) => {
            //     let newItem = {...item};
            //     delete newItem.images;
            //     newSections.push(newItem);

            // })

            // data.append('sections', JSON.stringify(newSections));
            data.append('new_exam', JSON.stringify(route.params));
            route.params.sections.map((item, index) => {
                // if (index == 0) {
                item.images.map((img, idx) => {
                    // console.log(img)
                    data.append('images_' + item.key, {
                        name: 'image_' + item.key + "_" + img.key + '.jpg',
                        type: 'image/jpeg',
                        uri: img.path.uri
                    })
                    // console.log(img)
                })
                // }


            })
            console.log("NewExam submit data", data);
            // return axios.post('http://192.168.1.37:3001/api/exam/create_new_exam', data,
            //     {
            //         headers:{
            //             Accept: 'application/json',
            //             'Content-Type':'multipart/form-data'
            //         }
            //     }
            // )
            //         .then(res => {
            //             console.log(res)
            //         })
            //         .catch(err => {

            //         })
            axios({
                method: 'post',
                url: 'http://10.0.0.2:3001/api/test/create_test',
                data: data,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                })
                .catch(err => {

                })
        }
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return (
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={require('../../../assets/back_arrow.png')} />

                    </TouchableOpacity>
                );

            },
            headerRight: () => {
                return (
                    <TouchableOpacity onPress={() => handleSaveData()}>
                        {/* <Image source={require('../../../assets/back_arrow.png')} /> */}
                        <Text
                            style={
                                {
                                    color: '#1570EF',
                                    // fontWeight: 'bold',
                                    fontSize: 18
                                }
                            }
                        >
                            Save
                        </Text>

                    </TouchableOpacity>
                );

            },
        });
    }, [navigation]);

    const [testData, setTestData] = useState({
        type: 'Reading',
        audio: '',
        title: '',
        duration: '',
        score: '',
        sections: [

        ]

    });

    const handleChangeData = (field, value) => {
        if (field == 'type') {
            // if (route.params) navigation.setParams({
            //     ...route.params,
            //     type: value
            // })
            // else setTestData({
            //     ...testData,
            //     type: value
            // })
            navigation.setParams({
                ...route.params,
                testData: {
                    ...route.params.testData,
                    type: value
                }
            });
        }
        else if (field == 'title') {
            // if (route.params) navigation.setParams({
            //     ...route.params,
            //     title: value
            // })
            // else setTestData({
            //     ...testData,
            //     title: value
            // })
            navigation.setParams({
                ...route.params,
                testData: {
                    ...route.params.testData,
                    title: value
                }
            });

            // console.log(testData.title)
        }
        else if (field == 'duration') {
            // if (route.params) navigation.setParams({
            //     ...route.params,
            //     duration: (isNaN(value) || value == '') ? '' : String(parseInt(value, 10))
            // })
            // else setTestData({
            //     ...testData,
            //     duration: (isNaN(value) || value == '') ? '' : String(parseInt(value, 10))
            // })

            navigation.setParams({
                ...route.params,
                testData: {
                    ...route.params.testData,
                    duration: (isNaN(value) || value == '') ? '' : String(parseInt(value, 10))
                }
            });
            // console.log(testData.duration)
        }
        else if (field == 'score') {
            // if (route.params) navigation.setParams({
            //     ...route.params,
            //     score: (isNaN(value) || value == '') ? '' : String(parseInt(value, 10))
            // })
            // else setTestData({
            //     ...testData,
            //     score: (isNaN(value) || value == '') ? '' : String(parseInt(value, 10))
            // })
            navigation.setParams({
                ...route.params,
                testData: {
                    ...route.params.testData,
                    score: (isNaN(value) || value == '') ? '' : String(parseInt(value, 10))
                }
            });
        }
    }

    return (
        <View style={styles.container}>
            {/* <Text>{route.params?.score}</Text> */}
            <View style={{ marginTop: 30, width: 350 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Title</Text>
                <TextInput
                    value={route.params.testData.title}
                    onChangeText={(text) => handleChangeData('title', text)}
                    style={{ width: 350, backgroundColor: '#E4E7EC', height: 50, paddingLeft: 10, fontSize: 15 }}
                    placeholder='Enter title'
                />
            </View>

            <View style={{ marginTop: 30, width: 350 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Duration (mins)</Text>
                <TextInput
                    keyboardType='numeric'
                    value={route.params.testData.duration}
                    onChangeText={(text) => handleChangeData('duration', text)}
                    style={{ width: 350, backgroundColor: '#E4E7EC', height: 50, paddingLeft: 10, fontSize: 15 }}
                    placeholder='Enter duration'
                />
            </View>

            <View style={{ marginTop: 30, width: 350 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Score</Text>
                <TextInput
                    keyboardType='numeric'
                    value={route.params.testData.score}
                    onChangeText={(text) => handleChangeData('score', text)}
                    style={{ width: 350, backgroundColor: '#E4E7EC', height: 50, paddingLeft: 10, fontSize: 15 }}
                    placeholder='Enter score'
                />
            </View>

            <View style={{ marginTop: 30 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Skill</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={route.params.testData.type}
                    onValueChange={(itemValue) => handleChangeData('type', itemValue)}
                >
                    <Picker.Item label="Reading" value="reading"></Picker.Item>
                    <Picker.Item label="Listening" value="listening"></Picker.Item>
                </Picker>
            </View>

            {/* <View style={{ width: '25%', marginTop: 30 }}>
                <Button
                    onPress={onPressHandler}
                    title='Create'
                    color='#1570EF'
                >
                </Button>
            </View> */}
            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => navigation.navigate('Sections', {
                    ...route.params,
                
                })}
            >
                <Text
                    style={
                        {
                            color: '#1570EF',
                            fontWeight: 'bold'
                        }
                    }
                >
                    Next
                </Text>
                <Image
                    style={styles.floatingButton}
                    // source={{ uri: 'https://github.com/tranhonghan/images/blob/main/plus_icon.png?raw=true' }}
                    // source={IMAGENAME}
                    source={require('../../../assets/next.png')}
                />

            </TouchableOpacity>


        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center'
        // width: 100
    },
    picker: {
        width: 350,
        height: 50,
        borderColor: 'red',
        borderWidth: 4,
        backgroundColor: '#E4E7EC',
        borderRadius: 20,
        paddingLeft: 10,
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
        width: 30,
        height: 30,
    }
});