import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import data from './Challenge/DATA.json'
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ChallengeCreate({ navigation }) {

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

    const [pickerValue, setPickerValue] = useState('Reading');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Empty');
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
        setText(fDate + '\n' + fTime);
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    return (
        <View style={styles.container}>


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

            <View style={{ marginTop: 30, width: 350 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Title</Text>
                <TextInput
                    style={{ width: 350, backgroundColor: '#E4E7EC', height: 50 }}
                    placeholder='Enter challenge name'
                />
            </View>

            <View style={{ marginTop: 30, width: 350 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Start time</Text>
                <TouchableOpacity
                    style={{ backgroundColor: '#E4E7EC', width: 350, height: 50 }}
                    onPress={() => showMode('time')}
                >
                    <Image
                        style={{ width: 30, height: 30, position:'absolute', right:15, top:10 }}
                        source={{ uri: 'https://github.com/tranhonghan/images/blob/main/plus_icon.png?raw=true' }}
                    />
                </TouchableOpacity>

                <Text>{text}</Text>

                {show && (<DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChange}
                >

                </DateTimePicker>)}
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
    },
});