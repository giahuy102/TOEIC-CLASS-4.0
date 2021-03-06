import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

import { useSelector, useDispatch } from "react-redux";
import { addNewChallenge } from './slice/challengesListSlice';

import Constants from 'expo-constants';

const API_URL = Constants.manifest.extra.API_URL;

const CHALLENGE_PREFIX = '/api/challenge';

export default function ChallengeCreate({ navigation, route }) {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.profile._id);
    const { classId, type } = route.params;

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
                    <TouchableOpacity onPress={() => navigation.pop()}>
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

        var challenge = { type: pickerValue, title, startDate, timeStart, endDate, timeEnd }


        // console.log("client email: ", emailUser)

        await axios.post(API_URL + CHALLENGE_PREFIX + '/create_challenge', { userId, classId, challenge })
            .then(res => {
                const newlyAddedChallenge = res.data;
                // console.log(newlyAddedChallenge);
                if (type === 'challenging') {
                    dispatch(addNewChallenge(newlyAddedChallenge))
                } else if (type === 'upcoming') {
                    dispatch(addNewChallenge(newlyAddedChallenge))
                } else if (type === 'ended') {
                    dispatch(addNewChallenge(newlyAddedChallenge))
                } else {
                    console.log('Invalid Challenge Type in ChallengeCreate');
                }
                // console.log("send post request to create challenge")

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
            })
            .catch((err) => {
                const { data, status, headers } = err.response;
                const { message: errorMessage } = data;
                console.log("/create_challenge err.response.data.message", errorMessage);
                Alert.alert('Create Challenge Not Success!', `${errorMessage}`, [
                    // { text: 'OK', onPress: () => navigation.pop() }
                    { text: 'OK', onPress: () => navigation.pop() }
                ]);
            })
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