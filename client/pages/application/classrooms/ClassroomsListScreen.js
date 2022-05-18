import * as React from "react";
import { useState } from "react";
import { View, ScrollView, Text, StyleSheet, Modal, Alert, Pressable } from "react-native";
import { Button } from "react-native";

import AddClassroomPopupModal from "./AddClassroomPopupModal";

import AppStyles from "../../../styles/ClassroomsListScreen.scss";

import fakeClassroomsList from "./fakedata/fakeClassroomsListData.json";

export default function ClassroomsListScreen({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false);

    const handleAccessToClassroomDetailScreen = (classroomDetailData) => {
        navigation.navigate("ClassroomDetailScreen", { ...classroomDetailData });
    };

    return (
        <View style={AppStyles.flexStartContainer}>
            <View style={AppStyles.ClassroomsListSearchAndCategoriesButtonView}>

            </View>

            <ScrollView>
                {fakeClassroomsList.map(({ _id, teacherId, numberStudent, level, end_date, start_date, classname }) => (
                    <Pressable key={_id} onPress={() => handleAccessToClassroomDetailScreen({ _id, teacherId, numberStudent, level, end_date, start_date, classname })}>
                        <ClassroomsListItem _id={_id} teacherId={teacherId} numberStudent={numberStudent} level={level} end_date={end_date} start_date={start_date} classname={classname} />
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

function ClassroomsListItem({ _id, teacherId, numberStudent, level, end_date, start_date, classname }) {
    return (
        <View style={AppStyles.ClassroomsListItem}>
            <View style={AppStyles.ClassroomsListItemHeader}>
                <View><Text>{`${classname}`}</Text></View>
                <View><Text>{`Joined`}</Text></View>
            </View>
            <View style={AppStyles.ClassroomListItemBody}>
                <Text style={AppStyles.ClassroomsListItemText}>
                    {`${_id}, ${teacherId}, ${numberStudent}, ${level}, ${end_date}, ${start_date}, ${classname}`}
                </Text>
            </View>
        </View>
    )
}