import React, { useState } from "react";
import { Pressable, View, Text, Button } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";

import { loadToken } from "../../../services/JWTStorage";
import { dateStrConverter } from "../../../utils/dateStrConverter";

import ClassroomService from "../../../services/ClassroomService";

import AppStyles from "../../../styles/AddClassroomPopupModal.scss";

export default function AddClassroomPopupModal({ ClassroomsListData, setClassroomsListData, addClassroomModalVisible, setAddClassroomModalVisible, handleAccessToClassroomDetailScreen }) {
    const [classroomName, setClassroomName] = useState("");
    const [number_student, setNumber_student] = useState("0");
    const [toeicLevel, setToeicLevel] = useState(null);
    const [classroomPassword, setClassroomPassword] = useState("");

    const [startDateValue, setStartDateValue] = useState(new Date());
    const [endDateValue, setEndDateValue] = useState(new Date());

    const [startDate, setStartDate] = useState("Choose start date");
    const [endDate, setEndDate] = useState("Choose end date");

    const [dateTimePickerMode, setDateTimePickerMode] = useState('data'); // or 'time'

    const [showStartDateTimePicker, setShowStartDateTimePicker] = useState(false);
    const [showEndDateTimePicker, setShowEndDateTimePicker] = useState(false);

    const onStartChange = (event, selectedDate) => {
        setShowStartDateTimePicker(false);
        setStartDateValue(selectedDate);
        setStartDate(`${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`);
    }

    const onEndChange = (event, selectedDate) => {
        setShowEndDateTimePicker(false);
        setEndDateValue(selectedDate);
        setEndDate(`${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`);
    }

    const showModeStart = (currentMode) => {
        setShowStartDateTimePicker(true);
        setDateTimePickerMode(currentMode);
    }

    const showModeEnd = (currentMode) => {
        setShowEndDateTimePicker(true);
        setDateTimePickerMode(currentMode);
    }

    const handleAddNewClassroomSubmit = async () => {
        console.log("Call here")
        const loadTokenResponse = await loadToken();
        if (loadTokenResponse) {
            const AddNewClassroomRequestPayload = { classroomName, number_student, toeicLevel, startDateValue, endDateValue, classroomPassword, token: loadTokenResponse };
            const AddNewClassroomResponse = await ClassroomService.createClassroom(AddNewClassroomRequestPayload);
            const AddNewClassroomResponseData = AddNewClassroomResponse.data['data'];
            console.log('AddClassroomPopupModal AddNewClassroomResponseData', AddNewClassroomResponseData);
            const AccessToClassroomDetailScreenData = {
                _id: AddNewClassroomResponseData._id,
                number_student: AddNewClassroomResponseData.number_student,
                level: AddNewClassroomResponseData.level,
                classname: AddNewClassroomResponseData.classname,
                start_date: AddNewClassroomResponseData.start_date.slice(0, 10),
                end_date: AddNewClassroomResponseData.end_date.slice(0, 10),
                status: AddNewClassroomResponseData.status,
                isJoined: true,
            }
            console.log('AddClassroomPopupModal new Class append to useState', AccessToClassroomDetailScreenData);
            setClassroomsListData([...ClassroomsListData, AccessToClassroomDetailScreenData]);
            setAddClassroomModalVisible(!addClassroomModalVisible);
            /**
             *  * Causing bug: ClassroomsListScreen freeze after add classroom in modal successful *
             *  handleAccessToClassroomDetailScreen(AccessToClassroomDetailScreenData);
             */
        }
    }


    return (
        <View style={AppStyles.AddClassroomModalView}>
            <View style={AppStyles.AddClassroomModalHeaderView}>
                <Text style={AppStyles.AddClassroomModalHeaderText}>Add New Classroom Form</Text>
            </View>
            <View style={AppStyles.AddClassroomModalBodyView}>
                <TextInput
                    style={AppStyles.AddClassroomModalPaperTextInput}
                    placeholder="Classroom Name"
                    label="Classroom Name"
                    value={classroomName}
                    right={<TextInput.Icon name="school" />}
                    onChangeText={(text) => setClassroomName(text)}
                />

                <TextInput
                    style={AppStyles.AddClassroomModalPaperTextInput}
                    placeholder="Number of student"
                    keyboardType="number-pad"
                    label="Number of student"
                    value={number_student}
                    right={<TextInput.Icon name="account" />}
                    onChangeText={(text) => setNumber_student(text)}
                />

                <TextInput
                    style={AppStyles.AddClassroomModalPaperTextInput}
                    placeholder="Classroom Password"
                    label="Classroom Password"
                    secureTextEntry
                    value={classroomPassword}
                    right={<TextInput.Icon name="eye" />}
                    onChangeText={(text) => setClassroomPassword(text)}
                />

                <Picker
                    prompt="Toeic Level"
                    selectedValue={toeicLevel}
                    onValueChange={(itemValue) => { setToeicLevel(itemValue) }}
                    style={AppStyles.AddClassroomModalPressable}
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

                <Pressable
                    style={AppStyles.AddClassroomModalPressable}
                    onPress={() => showModeStart('date')}
                >
                    <Text style={AppStyles.AddClassroomModalPressableText}>{startDate}</Text>
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
                <Pressable
                    style={AppStyles.AddClassroomModalPressable}
                    onPress={() => showModeEnd('date')}
                >
                    <Text style={AppStyles.AddClassroomModalPressableText}>{endDate}</Text>
                </Pressable>
                {showEndDateTimePicker &&
                    <DateTimePicker
                        testID='dateTimePicker'
                        value={endDateValue}
                        mode={dateTimePickerMode}
                        is24Hour={true}
                        display='default'
                        onChange={onEndChange}
                    />
                }
            </View>
            <View style={AppStyles.AddClassroomModalBottomView}>
                <Pressable
                    style={AppStyles.ClassroomsListScreenOtherButton}
                    onPress={() => setAddClassroomModalVisible(!addClassroomModalVisible)}
                >
                    <Text style={AppStyles.ClassroomsListScreenOtherButtonText}>Cancel</Text>
                </Pressable>

                <Pressable
                    style={AppStyles.ClassroomsListScreenOtherButton}
                    onPress={() => handleAddNewClassroomSubmit()}
                >
                    <Text style={AppStyles.ClassroomsListScreenOtherButtonText}>Submit</Text>
                </Pressable>
            </View>
        </View >
    );
}