import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, FlatList, Alert } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import data from './Ignored_Challenge/DATA.json'
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function NewExam({ navigation }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return (
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={require('../assets/back_arrow.png')} />

                    </TouchableOpacity>
                );

            },
        });
    }, [navigation]);

    const [pickerValue, setPickerValue] = useState('Reading');

    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [score, setScore] = useState('');

    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date());
    // const [mode, setMode] = useState('date');
    // const [showStart, setShowStart] = useState(false);
    // const [showEnd, setShowEnd] = useState(false);
    // const [dateStart, setDateStart] = useState('Select date');
    // const [timeStart, setTimeStart] = useState('Select time');
    // const [dateEnd, setDateEnd] = useState('Select date');
    // const [timeEnd, setTimeEnd] = useState('Select time');

    // const onChangeStart = (event, selectedDateStart) => {
    //     const currentDate = selectedDateStart || startDate;
    //     setShowStart(false);
    //     setStartDate(currentDate);

    //     let tempDate = new Date(currentDate);
    //     let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    //     // let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
    //     let fTime = tempDate.getHours() + 'h' + tempDate.getMinutes();
    //     // setStartText(fDate + '\n' + fTime);
    //     setDateStart(fDate);
    //     setTimeStart(fTime);
    // }

    // const onChangeEnd = (event, selectedDatEnd) => {
    //     const currentDate = selectedDatEnd || endDate;
    //     setShowEnd(false);
    //     setEndDate(currentDate);

    //     let tempDate = new Date(currentDate);
    //     let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    //     // let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
    //     let fTime = tempDate.getHours() + 'h' + tempDate.getMinutes();
    //     // setEndText(fDate + '\n' + fTime);
    //     setDateEnd(fDate);
    //     setTimeEnd(fTime);
    // }
    // const showModeStart = (currentMode) => {
    //     setShowStart(true);
    //     setMode(currentMode);
    // }
    // const showModeEnd = (currentMode) => {
    //     setShowEnd(true);
    //     setMode(currentMode);
    // }
    const onPressHandler = () => {
        Alert.alert('Congratulation!', 'Create new challenge successfully', [
            { text: 'OK', onPress: () => navigation.pop() }
        ]);
    }
    return (
        <View style={styles.container}>
            <View style={{ marginTop: 30, width: 350 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Title</Text>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={{ width: 350, backgroundColor: '#E4E7EC', height: 50, paddingLeft: 10, fontSize: 15 }}
                    placeholder='Enter challenge name'
                />
            </View>

            <View style={{ marginTop: 30, width: 350 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Duration (mins)</Text>
                <TextInput
                    keyboardType='numeric'
                    value={duration}
                    onChangeText={setDuration}
                    style={{ width: 350, backgroundColor: '#E4E7EC', height: 50, paddingLeft: 10, fontSize: 15 }}
                    placeholder='Enter duration'
                />
            </View>

            <View style={{ marginTop: 30, width: 350 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Score</Text>
                <TextInput
                    keyboardType='numeric'
                    value={score}
                    onChangeText={setScore}
                    style={{ width: 350, backgroundColor: '#E4E7EC', height: 50, paddingLeft: 10, fontSize: 15 }}
                    placeholder='Enter score'
                />
            </View>

            <View style={{ marginTop: 30 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Skill</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={pickerValue}
                    onValueChange={(itemValue) => setPickerValue(itemValue)}
                >
                    <Picker.Item label="Reading" value="reading"></Picker.Item>
                    <Picker.Item label="Listening" value="listening"></Picker.Item>
                </Picker>
            </View>

            <View style={{ width: '25%', marginTop: 30 }}>
                <Button
                    onPress={onPressHandler}
                    title='Create'
                    color='#1570EF'
                >
                </Button>
            </View>



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
});