import React, { useState } from "react";
import { Pressable, View, Text, Button } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";

import AppStyles from "../../../styles/SystemFontStyles.scss";

export default function AddClassroomPopupModal({ modalVisible, setModalVisible }) {
    const [studentNumber, setStudentNumber] = useState(0);
    const [toeicLevel, setToeicLevel] = useState(null);
    const [classroomPassword, setClassroomPassword] = useState("");

    const [startDateValue, setStartDateValue] = useState(new Date());
    const [endDateValue, setEndDateValue] = useState(new Date());

    const [startDate, setStartDate] = useState("Choose start date");
    const [endDate, setEndDate] = useState("Choose start time");
    const [startTime, setStartTime] = useState("Choose end date");
    const [endTime, setEndTime] = useState("Choose end time");

    const [dateTimePickerMode, setDateTimePickerMode] = useState('data'); // or 'time'

    const [showStartDateTimePicker, setShowStartDateTimePicker] = useState(false);
    const [showEndDateTimePicker, setShowEndDateTimePicker] = useState(false);

    const onStartChange = (event, selectedDate) => {
        setShowStartDateTimePicker(false);
        setStartDate(selectedDate);
    }

    const onEndChange = (event, selectedDate) => {
        setShowEndDateTimePicker(false);
        setEndDate(selectedDate);
    }

    const showModeStart = (currentMode) => {
        setShowStartDateTimePicker(true);
        setDateTimePickerMode(currentMode);
    }

    const showModeEnd = (currentMode) => {
        setShowEndDateTimePicker(true);
        setDateTimePickerMode(currentMode);
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
                    style={AppStyles.AddClassroomModalPaperTextInput}
                    placeholder="Number of student"
                    keyboardType="number-pad"
                    label="Number of student"
                    value={studentNumber}
                    right={<TextInput.Icon name="account" />}
                    onChangeText={(text) => setStudentNumber(text)}
                />

                <Picker
                    prompt="Toeic Level"
                    selectedValue={toeicLevel}
                    onValueChange={(itemValue) => { setToeicLevel(itemValue) }}
                    style={AppStyles.AddClassroomModalTextInput}
                    placeholder="Toeic Level"
                >
                    <Picker.Item label="Toeic Class Level ..." value={null} />
                    <Picker.Item label="400" value={400} />
                    <Picker.Item label="500" value={500} />
                    <Picker.Item label="600" value={600} />
                    <Picker.Item label="700" value={700} />
                    <Picker.Item label="800" value={800} />
                    <Picker.Item label="900" value={900} />
                </Picker>

                <TextInput
                    style={AppStyles.AddClassroomModalPaperTextInput}
                    placeholder="Classroom Password"
                    label="Classroom Password"
                    secureTextEntry
                    value={classroomPassword}
                    onChangeText={(text) => setClassroomPassword(text)}
                />

                <View>
                    <Pressable onPress={() => showModeStart('date')}>
                        {/* <TextInput
                            style={AppStyles.AddClassroomModalPaperTextInput}
                            placeholder="Pick Classroom Start Date"
                            label="Classroom Start Date"
                            value={startDate}
                        /> */}
                        <Text style={{ paddingLeft: 10, paddingTop: 15, fontSize: 15 }}>123</Text>
                    </Pressable>
                    <Pressable onPress={() => showModeStart('time')}>
                        <TextInput
                            style={AppStyles.AddClassroomModalPaperTextInput}
                            placeholder="Pick Classroom Start Time"
                            label="Classroom Start Time"
                            value={startTime}
                        />
                    </Pressable>

                    {showStartDateTimePicker &&
                        <DateTimePicker
                            testID='dateTimePicker'
                            value={startDateValue}
                            mode={dateTimePickerMode}
                            is24Hour={true}
                            display='default'
                            onChange={onStartChange}
                        />
                    }
                </View>


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