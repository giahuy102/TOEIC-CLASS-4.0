import * as React from "react";
import { useState } from "react";
import { View, ScrollView, Text, StyleSheet, Modal, Alert, Pressable } from "react-native";
import { Button } from "react-native";

import AddClassroomPopupModal from "./AddClassroomPopupModal";

import AppStyles from "../../../styles/SystemFontStyles.scss";

import fakeClassroomsList from "./fakedata/fakeClassroomsListData.json";

export default function ClassroomsListScreen({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false);

    console.log("fakeClassroomsList", fakeClassroomsList);

    const handleAccessToClassroomDetailScreen = (classroomDetailData) => {
        navigation.navigate("ClassroomDetailScreen", { ...classroomDetailData });
    };

    return (
        <View style={AppStyles.flexStartContainer}>
            <View style={AppStyles.ClassroomsListSearchAndCategoriesButtonView}>

            </View>

            <ScrollView>
                {fakeClassroomsList.map(({ id, teacherId, numberStudent, level, end_date, start_date, classname, status }) => (
                    <Pressable key={id} onPress={() => handleAccessToClassroomDetailScreen({ id, teacherId, numberStudent, level, end_date, start_date, classname, status })}>
                        <ClassroomsListItem id={id} teacherId={teacherId} numberStudent={numberStudent} level={level} end_date={end_date} start_date={start_date} classname={classname} status={status} />
                    </Pressable>
                ))}
            </ScrollView>

            <Modal
                animationType="fade"
                hasBackDrop={false}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed!");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={AppStyles.ModalContainer}>
                    <AddClassroomPopupModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
                </View>
            </Modal>
            <View style={AppStyles.ClassroomsListScreenAddClassroomButtonView}>
                <Pressable
                    style={AppStyles.ClassroomsListScreenAddClassroomButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={AppStyles.ClassroomsListScreenAddClassroomButtonText}>+</Text>
                </Pressable>
            </View>
        </View>
    )
}

function ClassroomsListItem({ id, teacherId, numberStudent, level, end_date, start_date, classname, status }) {
    return (
        <View style={AppStyles.ClassroomsListItem}>
            <Text style={AppStyles.ClassroomsListItemText}>{`${id}, ${teacherId}, ${numberStudent}, ${level}, ${end_date}, ${start_date}, ${classname}, ${status}`}</Text>
        </View>
    )
}