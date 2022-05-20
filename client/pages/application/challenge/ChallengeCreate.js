import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { loadEmail } from '../../../services/JWTStorage';
import axios from 'axios';
import { useSelector } from "react-redux";

const BASE_API_URL = `http://10.0.2.2:${3001}`;
const CHALLENGE_PREFIX = '/api/challenge';

export default function ChallengeCreate({ navigation, route }) {


    console.log("params: ", route.params['challengesList']);

    var emailUser = useSelector(state => state.profile.email)
    const navigate = useNavigation();
    const navigateToChallenging = () => {
        setTitle('')
        setStartDate(new Date())
        setEndDate(new Date())
        setMode('date');
        setShowStart(false);
        setShowEnd(false);
        setDateStart('Select date');
        setTimeStart('Select time');
        setDateEnd('Select date');
        setTimeEnd('Select time');
        navigation.push('ChallengeScreen')
    }
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return (
                    // <TouchableOpacity onPress={() => navigation.navigate('ChallengeChallenging')}>
                    // <TouchableOpacity onPress={navigateToChallenging}>
                    <TouchableOpacity onPress={navigateToChallenging}>
                        <Image source={require('../../../assets/back_arrow.png')} />
                    </TouchableOpacity>
                );

            },
        });
    }, [navigation]);

    const [pickerValue, setPickerValue] = useState('Reading');
    const [title, setTitle] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    const [dateStart, setDateStart] = useState('Select date');
    const [timeStart, setTimeStart] = useState('Select time');
    const [dateEnd, setDateEnd] = useState('Select date');
    const [timeEnd, setTimeEnd] = useState('Select time');

    const onChangeStart = (event, selectedDateStart) => {
        const currentDate = selectedDateStart || startDate;
        setShowStart(false);
        setStartDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        // let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
        let fTime = tempDate.getHours() + 'h' + tempDate.getMinutes();
        // setStartText(fDate + '\n' + fTime);
        setDateStart(fDate);
        setTimeStart(fTime);
    }

    const onChangeEnd = (event, selectedDatEnd) => {
        const currentDate = selectedDatEnd || endDate;
        setShowEnd(false);
        setEndDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        // let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
        let fTime = tempDate.getHours() + 'h' + tempDate.getMinutes();
        // setEndText(fDate + '\n' + fTime);
        setDateEnd(fDate);
        setTimeEnd(fTime);
    }
    const showModeStart = (currentMode) => {
        setShowStart(true);
        setMode(currentMode);
    }
    const showModeEnd = (currentMode) => {
        setShowEnd(true);
        setMode(currentMode);
    }
    const getDateMonthYear = (cur) => {
        console.log("change format: ", cur)
        var day = '', month = '', year = ''
        var count = 0
        for (let i = 0; i < cur.length; i++) {
            if (cur[i] == '/') count++
            if (count == 0 && cur[i] != '/') day += cur[i]
            if (count == 1 && cur[i] != '/') month += cur[i]
            if (count == 2 && cur[i] != '/') year += cur[i]
        }
        return [day, month, year]
    }


    const onPressHandler = async () => {

        var challenge = { pickerValue, title, startDate, timeStart, endDate, timeEnd }


        // console.log("client email: ", emailUser)

        await axios.post(BASE_API_URL + CHALLENGE_PREFIX + '/create_challenge', { emailUser, challenge })
            .then(res => {
                console.log("send post request to create challenge")
            })
            .catch((err) => {
                console.log("err: ", err)
            })

        setPickerValue('Reading')
        setTitle('')
        setStartDate(new Date())
        setEndDate(new Date())
        setMode('date');
        setShowStart(false);
        setShowEnd(false);
        setDateStart('Select date');
        setTimeStart('Select time');
        setDateEnd('Select date');
        setTimeEnd('Select time');

        Alert.alert('Congratulation!', 'Create new challenge successfully', [
            // { text: 'OK', onPress: () => navigation.pop() }
            { text: 'OK', onPress: () => navigation.pop() }
        ]);
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
                    style={{ width: 350, backgroundColor: '#E4E7EC', height: 50, paddingLeft: 10, fontSize: 15 }}
                    placeholder='Enter challenge name'
                    value={title}
                    onChangeText={(itemValue) => setTitle(itemValue)}
                />
            </View>

            <View style={{ marginTop: 30, width: 350 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Start time</Text>
                <View>
                    <TouchableOpacity
                        style={{ backgroundColor: '#E4E7EC', width: 350, height: 50 }}
                        onPress={() => showModeStart('date')}
                    >
                        <Text style={{ paddingLeft: 10, paddingTop: 15, fontSize: 15 }}>{dateStart}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: '#E4E7EC', width: 350, height: 50 }}
                        onPress={() => showModeStart('time')}
                    >
                        <Text style={{ paddingLeft: 10, paddingTop: 15, fontSize: 15 }}>{timeStart}</Text>
                    </TouchableOpacity>
                </View>
                {showStart && (<DateTimePicker
                    testID='dateTimePicker'
                    value={startDate}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChangeStart}
                >
                </DateTimePicker>)}
            </View>


            <View style={{ marginTop: 30, width: 350 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>End time</Text>
                <View>
                    <TouchableOpacity
                        style={{ backgroundColor: '#E4E7EC', width: 350, height: 50 }}
                        onPress={() => showModeEnd('date')}
                    >
                        <Text style={{ paddingLeft: 10, paddingTop: 15, fontSize: 15 }}>{dateEnd}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: '#E4E7EC', width: 350, height: 50 }}
                        onPress={() => showModeEnd('time')}
                    >
                        <Text style={{ paddingLeft: 10, paddingTop: 15, fontSize: 15 }}>{timeEnd}</Text>
                    </TouchableOpacity>
                </View>
                {/* <Text>{textEnd}</Text> */}

                {showEnd && (<DateTimePicker
                    testID='dateTimePicker2'
                    value={endDate}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChangeEnd}
                >

                </DateTimePicker>)}
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