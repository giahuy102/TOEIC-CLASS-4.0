import React, { useState } from "react";
import { Pressable, View, Text, Button } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';

import AppStyles from "../../../styles/SystemFontStyles.scss";

export default function AddClassroomPopupModal({ modalVisible, setModalVisible }) {
    const [studentNumber, setStudentNumber] = useState(0);
    const [toeicLevel, setToeicLevel] = useState(400);
    const [classroomPassword, setClassroomPassword] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const onStartDateChange = (event, selectedDate) => {
        setShowStartDatePicker(false);
        setStartDate(selectedDate);
    }

    const onEndDateChange = (event, selectedDate) => {
        setShowEndDatePicker(false);
        setEndDate(selectedDate);
    }

    const handleAddNewClassroomSubmit = (event) => {
        event.preventDefault();
        const AddNewClassroomRequestPayload = { studentNumber, toeicLevel, startDate, endDate, classroomPassword };
        console.log("Add New Classroom Payload", AddNewClassroomRequestPayload);
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
                <View style={AppStyles.AddClassroomModalSelectDateButtonsView}>
                    <Pressable
                        style={AppStyles.AddClassroomModalSelectDateButton}
                        onPress={() => setShowStartDatePicker(true)} title="Choose Start Date!" >
                        <Text style={AppStyles.AddClassroomModalSelectDateButtonText}>Choose Start Date</Text>
                    </Pressable>
                    <Pressable
                        style={AppStyles.AddClassroomModalSelectDateButton}
                        onPress={() => setShowEndDatePicker(true)} title="Choose End Date!"
                    >
                        <Text style={AppStyles.AddClassroomModalSelectDateButtonText}>Choose End Date</Text>
                    </Pressable>
                </View>
                {showStartDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={startDate}
                        mode={'date'}
                        onChange={onStartDateChange}
                    />
                )}
                <Text style={AppStyles.AddClassroomModalText}>Start Date: {startDate.toLocaleString()}</Text>
                {showEndDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={endDate}
                        mode={'date'}
                        onChange={onEndDateChange}
                    />
                )}
                <Text style={AppStyles.AddClassroomModalText}>End Date: {endDate.toLocaleString()}</Text>

                <TextInput
                    style={AppStyles.AddClassroomModalTextInput}
                    placeholder="Classroom Password"
                    label="Classroom Password"
                    secureTextEntry
                    value={classroomPassword}
                    onChangeText={(text) => setClassroomPassword(text)}
                />

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
                    onPress={(e) => handleAddNewClassroomSubmit(e)}
                >
                    <Text style={AppStyles.ClassroomsListScreenOtherButtonText}>Submit</Text>
                </Pressable>
            </View>
        </View>
    );
}