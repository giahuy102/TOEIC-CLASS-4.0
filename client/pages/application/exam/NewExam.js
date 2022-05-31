import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import data from '../../Ignored_Challenge/DATA.json'
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

import * as DocumentPicker from 'expo-document-picker';

export default function NewExam({ navigation, route }) {
    const handleSaveData = async() => {
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
            await data.append('new_exam', JSON.stringify(route.params.testData));

            console.log(route.params.testData)

            await route.params.testData.sections.map((item, index) => {
                // if (index == 0) {
                item.images.map((img, idx) => {
                    // console.log(img)
                    if (img.localPath) {
                        data.append('images_' + item.key, {
                            name: 'image_' + item.key + "_" + img.key + '.jpg',
                            type: img.type,
                            uri: img.localPath
                        })
                    }

                    // console.log(img)
                })
                if (item.audio) {
                    data.append('audio_' + item.key, item.audio)
                }
                // }


            })
            console.log("NewExam submit data", data);
            axios.post('http://192.168.1.37:3001/api/test/create_test', data,
                {
                    headers:{
                        Accept: 'application/json',
                        'Content-Type':'multipart/form-data'
                    }
                }
            )
                    .then(res => {
                        console.log('Success')
                    })
                    .catch(err => {
                        alert(err);
                    })
            // axios({
            //     method: 'post',
            //     url: 'http://10.0.0.2:3001/api/test/create_test',
            //     data: data,
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'multipart/form-data'
            //     }
            // })
            //     .then(res => {
            //     })
            //     .catch(err => {

            //     })
        }
    }

    const handleUpdateData = async(id) => {
        // console.log(route.params.type)
        // console.log(route.params)
        if (route.params) {
            const data = new FormData();

            await data.append('new_exam', JSON.stringify(route.params.testData));

            // console.log(route.params.testData)

            await route.params.testData.sections.map((item, index) => {
                // if (index == 0) {
                item.images.map((img, idx) => {
                    // console.log(img)
                    if (img.localPath) {
                        data.append('images_' + item.key, {
                            name: 'image_' + item.key + "_" + img.key + '.jpg',
                            type: img.type,
                            uri: img.localPath
                        })
                    }

                    // console.log(img)
                })
                if (item.audio) {
                    data.append('audio_' + item.key, item.audio)
                }
                // }


            })
            // console.log("NewExam submit data", data);
            axios.post('http://192.168.1.37:3001/api/test/' + id + '/update', data,
                {
                    headers:{
                        Accept: 'application/json',
                        'Content-Type':'multipart/form-data'
                    }
                }
            )
                    .then(res => {
                        console.log('Success')
                    })
                    .catch(err => {
                        alert(err);
                    })

        }        
    }

    const saveOrUpdate = () => {
        if (route.params.keyStack[0]) {
            handleUpdateData(route.params.keyStack[0]);
        }
        else handleSaveData();
        navigation.pop();
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
                    <TouchableOpacity onPress={() => saveOrUpdate()}>
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
    }, [navigation, route.params]);

    // const [testData, setTestData] = useState({
    //     type: 'Reading',
    //     audio: '',
    //     title: '',
    //     duration: '',
    //     score: '',
    //     sections: [

    //     ]

    // });

    const handleChangeData = async (field, value) => {
        if (field == 'type') {
            // if (route.params) navigation.setParams({
            //     ...route.params,
            //     type: value
            // })
            // else setTestData({
            //     ...testData,
            //     type: value
            // })
            // newTestData = {...route.params.testData};

            await navigation.setParams({
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
            await navigation.setParams({
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

            await navigation.setParams({
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
            await navigation.setParams({
                ...route.params,
                testData: {
                    ...route.params.testData,
                    score: (isNaN(value) || value == '') ? '' : String(parseInt(value, 10))
                }
            });
        }
    }

    const handleSelectDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            // type:'image/*'
        });
        console.log(result);
        if (result.type != 'cancel') {
            navigation.setParams({
                ...route.params,
                testData: {
                    ...route.params.testData,
                    audio: {
                        type: result.mimeType,
                        name: result.name,
                        localPath: result.uri,
                        remotePath: ''
                    }
                }
            })
        }
    }

    const handleDeleteDocument = () => {
        navigation.setParams({
            ...route.params,
            testData: {
                ...route.params.testData,
                audio: null
            }
        })
    }

    return (
    <View
        style={
            {
                flex: 1
            }
        }
    >
        <ScrollView
            contentContainerStyle={styles.container}
        >
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
                    value={route.params.testData.duration ? route.params.testData.duration.toString() : route.params.testData.duration}
                    onChangeText={(text) => handleChangeData('duration', text)}
                    style={{ width: 350, backgroundColor: '#E4E7EC', height: 50, paddingLeft: 10, fontSize: 15 }}
                    placeholder='Enter duration'
                />
            </View>

            <View style={{ marginTop: 30, width: 350 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Score</Text>
                <TextInput
                    keyboardType='numeric'
                    value={route.params.testData.score ? route.params.testData.score.toString() : route.params.testData.score}
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
                    <Picker.Item label="Reading" value="Reading"></Picker.Item>
                    <Picker.Item label="Listening" value="Listening"></Picker.Item>
                </Picker>
            </View>
            {
            route.params.testData.type == 'Listening' &&
            <View
                style={
                    {
                        alignItems: 'center'
                    }
                }
            >
                <TouchableOpacity
                    onPress={handleSelectDocument}
                    style={
                        {
                            marginTop: 25
                        }
                    }
                >
                    <Image
                        source={require('../../../assets/audio.png')}
                    
                    />
                </TouchableOpacity>
                
                <View
                    style={
                        {
                            backgroundColor: '#E4E7EC',
                            flexDirection: 'row',
                            width: 250,
                            height: 70,
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }
                    }
                >
                    {
                        route.params.testData.audio &&
                        <Text>{route.params.testData.audio.name}</Text>
                    }
                    
                    <TouchableOpacity
                        onPress={handleDeleteDocument}
                    >
                        <Image
                            source={require('../../../assets/trash.png')}
                        
                        />
                    </TouchableOpacity>
                </View>
            </View>
            
            }



        </ScrollView >
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
                source={require('../../../assets/next.png')}
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