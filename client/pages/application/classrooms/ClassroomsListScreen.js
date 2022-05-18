import * as React from "react";
import { useState } from "react";
import { View, ScrollView, Text, StyleSheet, Modal, Alert, Pressable, TouchableOpacity, Image } from "react-native";
import { Button } from "react-native";

import AddClassroomPopupModal from "./AddClassroomPopupModal";

import AppStyles from "../../../styles/ClassroomsListScreen.scss";
import Ionicons from "@expo/vector-icons/Ionicons";

import fakeClassroomsList from "./fakedata/fakeClassroomsListData.json";



export default function ClassroomsListScreen({ navigation, route }) {

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

    const [modalVisible, setModalVisible] = useState(false);

    const handleAccessToClassroomDetailScreen = (classroomDetailData) => {
        navigation.navigate("ClassroomDetailScreen", { ...classroomDetailData });
    };

    return (
        <View style={AppStyles.ClassroomsListFlexStartContainer}>
            <View style={AppStyles.ClassroomsListSearchAndCategoriesButtonView}>

            </View>

            <ScrollView style={AppStyles.ClassroomsListScrollViewContainer}>
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
                <View><Text style={AppStyles.ClassroomsListItemHeaderClassName}>{`${classname}`}</Text></View>
                <View><Text style={AppStyles.ClassroomsListItemHeaderJoined}>{`Joined`}</Text></View>
            </View>
            <View style={AppStyles.ClassroomListItemBody}>
                <View style={AppStyles.ClassroomListItemBodyInfoView}>
                    <Ionicons name="person" color="black" size={18} />
                    <Text style={AppStyles.ClassroomsListItemText}>
                        {`${numberStudent}`}
                    </Text>
                </View>
                <View style={AppStyles.ClassroomListItemBodyInfoView}>
                    <Ionicons name="calendar" color="black" size={20} />
                    <Text style={AppStyles.ClassroomsListItemText}>
                        {`${end_date}\n${start_date}`}
                    </Text>
                </View>
                <View style={AppStyles.ClassroomListItemBodyInfoView}>
                    <Ionicons name="school" color="black" size={22} />
                    <Text style={AppStyles.ClassroomsListItemText}>
                        {`Toeic ${level}`}
                    </Text>
                </View>
            </View>
        </View>
    )
}