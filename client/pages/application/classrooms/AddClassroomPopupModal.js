import React, { useState } from "react";
import { Pressable, View, Text, Button } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';

import AppStyles from "../../../styles/SystemFontStyles.scss";

export default function AddClassroomPopupModal({ modalVisible, setModalVisible }) {
    const [studentNumber, setStudentNumber] = useState(0);
    const [toeicLevel, setToeicLevel] = useState(400);

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const showDatePicker = () => {
        showMode('date');
    }

    const showTimePicker = () => {
        showMode('time');
    }

    return (
        <View style={AppStyles.AddClassroomModalView}>
            <View style={AppStyles.AddClassroomModalHeaderView}>
                <Text style={AppStyles.AddClassroomModalHeaderText}>Add New Classroom Form</Text>
            </View>
            <View style={AppStyles.AddClassroomModalBodyView}>
                <TextInput
                    style={AppStyles.AddClassroomModalTextInput}
                    placeholder="Number of student"
                    keyboardType="number-pad"
                    label="Number of student"
                    value={studentNumber}
                    right={<TextInput.Icon name="account" />}
                    onChangeText={(text) => setStudentNumber(text)}
                />
                <TextInput
                    style={AppStyles.AddClassroomModalTextInput}
                    placeholder="TOEIC Level"
                    keyboardType="number-pad"
                    label="TOEIC Level"
                    value={toeicLevel}
                    right={<TextInput.Icon name="school-outline" />}
                    onChangeText={(text) => setToeicLevel(text)}
                />
                <View>
                    <Button onPress={showDatePicker} title="Show date picker!" />
                </View>
                <View>
                    <Button onPress={showTimePicker} title="Show time picker!" />
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}
                <Text>selected: {date.toLocaleString()}</Text>
            </View>
            <View style={AppStyles.AddClassroomModalBottomView}>
                <Pressable
                    style={AppStyles.ClassroomsListScreenOtherButton}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={AppStyles.ClassroomsListScreenOtherButtonText}>Cancel</Text>
                </Pressable>

                <Pressable
                    style={AppStyles.ClassroomsListScreenOtherButton}
                    onPress={() => { }}
                >
                    <Text style={AppStyles.ClassroomsListScreenOtherButtonText}>Submit</Text>
                </Pressable>
            </View>
        </View>
    );
}