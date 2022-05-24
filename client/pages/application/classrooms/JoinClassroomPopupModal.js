import React, { useState } from "react";
import { Pressable, View, Text, Button } from "react-native";
import { TextInput } from "react-native-paper";

import { loadToken } from "../../../services/JWTStorage";
import ClassroomService from "../../../services/ClassroomService";

import AppStyles from "../../../styles/JoinClassroomPopupModal.scss";

export default function JoinClassroomPopupModal({ ClassroomsListData, setClassroomsListData, joinClassroomModalVisible, setJoinClassroomModalVisible, currentClassId }) {
    const [joinClassroomPassword, setJoinClassroomPassword] = useState("");

    const handleJoinNewClassroomSubmit = async () => {
        const token = await loadToken();
        try {
            const JoinClassroomResponse = await ClassroomService.joinClassroomRequest(joinClassroomPassword, currentClassId, token);
            // console.log("JoinClassroomResponse", JoinClassroomResponse);
            const JoinClassroomResponseData = JoinClassroomResponse.data;
            // console.log("JoinClassroomResponseData", JoinClassroomResponseData);
            const JoinedClassroomId = JoinClassroomResponseData._id;
            // console.log("JoinedClassroomId", JoinedClassroomId);
            const newClassroomsListData = ClassroomsListData;
            // console.log('Classroom List Data', newClassroomsListData);
            for (const ClassroomInfo of newClassroomsListData) {
                // console.log('ClassroomInfo', ClassroomInfo);
                if (ClassroomInfo._id === JoinedClassroomId) {
                    ClassroomInfo['isJoined'] = true;
                    break;
                }
            }

            // console.log('Join Classroom Success, current Classroom List Data', newClassroomsListData);
            setClassroomsListData(newClassroomsListData);
            setJoinClassroomModalVisible(false);
        } catch (err) {
            console.log("ClassroomService.joinClassroomRequest return with Error code", err);
            alert('Join Classroom Not Success. Invalid Password or Bugs in code')
        }
    };

    return (
        <View style={AppStyles.JoinClassroomModalView}>
            <View style={AppStyles.JoinClassroomModalHeaderView}>
                <Text style={AppStyles.JoinClassroomModalHeaderText}>Join Classroom Password Form</Text>
            </View>

            <View style={AppStyles.JoinClassroomModalBodyView}>
                <TextInput
                    style={AppStyles.JoinClassroomModalPaperTextInput}
                    placeholder="Classroom Password"
                    label="Classroom Password"
                    secureTextEntry
                    value={joinClassroomPassword}
                    right={<TextInput.Icon name="eye" />}
                    onChangeText={(text) => setJoinClassroomPassword(text)}
                />
            </View>

            <View style={AppStyles.JoinClassroomModalBottomView}>
                <Pressable
                    style={AppStyles.ClassroomsListScreenOtherButton}
                    onPress={() => setJoinClassroomModalVisible(!joinClassroomModalVisible)}
                >
                    <Text style={AppStyles.ClassroomsListScreenOtherButtonText}>Cancel</Text>
                </Pressable>

                <Pressable
                    style={AppStyles.ClassroomsListScreenOtherButton}
                    onPress={() => handleJoinNewClassroomSubmit()}
                >
                    <Text style={AppStyles.ClassroomsListScreenOtherButtonText}>Submit</Text>
                </Pressable>
            </View>
        </View>
    )
}