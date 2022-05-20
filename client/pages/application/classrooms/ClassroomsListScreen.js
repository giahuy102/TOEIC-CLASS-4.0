import * as React from "react";
import { useState } from "react";
import { View, ScrollView, Text, StyleSheet, Modal, Alert, Pressable, TouchableOpacity, Image } from "react-native";
import { Button } from "react-native";
import { useSelector } from "react-redux";

import AddClassroomPopupModal from "./AddClassroomPopupModal";
import JoinClassroomPopupModal from "./JoinClassroomPopupModal";

import AppStyles from "../../../styles/ClassroomsListScreen.scss";
import Ionicons from "@expo/vector-icons/Ionicons";

import { loadToken } from "../../../services/JWTStorage";
import ClassroomService from "../../../services/ClassroomService";
import { dateStrFormatGetDate } from "../../../utils/dateStrConverter";

export default function ClassroomsListScreen({ navigation, route }) {
    const profileId = useSelector(state => state.profile._id);
    const [currentClassId, setCurrentClassId] = useState("");

    const [addClassroomModalVisible, setAddClassroomModalVisible] = useState(false);
    const [joinClassroomModalVisible, setJoinClassroomModalVisible] = useState(false);

    const [ClassroomsListData, setClassroomsListData] = useState([]);

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

    React.useEffect(async () => {
        const fetchAllClassrooms = async () => {
            const loadTokenResponse = await loadToken();
            console.log('ClassroomsListScreen Tokens:', loadTokenResponse);
            const fetchAllClassroomsResponse = await ClassroomService.getAllClassrooms(loadTokenResponse);
            const AllClassroomsData = fetchAllClassroomsResponse.data;
            // console.log('AllClassroomsData', AllClassroomsData);
            setClassroomsListData(AllClassroomsData);
        }
        await fetchAllClassrooms();
    }, []);


    const handleAccessToClassroomDetailScreen = async (classroomDetailData) => {
        console.log(classroomDetailData);
        const classId = classroomDetailData._id;
        console.log('classId', classId);
        const getClassroomDetailInfoResponse = await ClassroomService.getClassroomDetailInfo(classId);
        const getClassroomDetailInfoData = getClassroomDetailInfoResponse.data;
        const classroomStudentIdList = getClassroomDetailInfoData['students_list'].map(student_info => student_info._id);
        console.log("classroomStudentIdList", classroomStudentIdList);
        if (classroomStudentIdList.includes(profileId)) {
            navigation.navigate("ClassroomDetailScreen", { ...classroomDetailData });
        } else {
            setCurrentClassId(classId);
            setJoinClassroomModalVisible(true);
            // alert("You not in this class");
        }
    };

    return (
        <View style={AppStyles.ClassroomsListFlexStartContainer}>
            <View style={AppStyles.ClassroomsListSearchAndCategoriesButtonView}>

            </View>

            <Modal
                animationType="fade"
                hasBackDrop={false}
                visible={joinClassroomModalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed!");
                    setJoinClassroomModalVisible(!joinClassroomModalVisible)
                }}
            >
                <View style={AppStyles.ModalContainer}>
                    <JoinClassroomPopupModal ClassroomsListData={ClassroomsListData} setClassroomsListData={setClassroomsListData} joinClassroomModalVisible={joinClassroomModalVisible} setJoinClassroomModalVisible={setJoinClassroomModalVisible} currentClassId={currentClassId} />
                </View>
            </Modal>

            <ScrollView style={AppStyles.ClassroomsListScrollViewContainer}>
                {ClassroomsListData.map(({ _id, number_student, level, end_date, start_date, classname, isJoined }) => (
                    <Pressable key={_id} onPress={() => handleAccessToClassroomDetailScreen({ _id, number_student, level, end_date, start_date, classname })}>
                        <ClassroomsListItem _id={_id} number_student={number_student} level={level} end_date={end_date} start_date={start_date} classname={classname} isJoined={isJoined} />
                    </Pressable>
                ))}
            </ScrollView>

            <Modal
                animationType="fade"
                hasBackDrop={false}
                visible={addClassroomModalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed!");
                    setAddClassroomModalVisible(!addClassroomModalVisible);
                }}
            >
                <View style={AppStyles.ModalContainer}>
                    <AddClassroomPopupModal ClassroomsListData={ClassroomsListData} setClassroomsListData={setClassroomsListData} setAddClassroomModalVisible={setAddClassroomModalVisible} addClassroomModalVisible={addClassroomModalVisible} handleAccessToClassroomDetailScreen={handleAccessToClassroomDetailScreen} />
                </View>
            </Modal>
            <View style={AppStyles.ClassroomsListScreenAddClassroomButtonView}>
                <Pressable
                    style={AppStyles.ClassroomsListScreenAddClassroomButton}
                    onPress={() => setAddClassroomModalVisible(true)}
                >
                    <Image
                        style={AppStyles.AddClassroomModalFloatingButton}
                        source={require('../../Ignored_Challenge/assets/plus.png')}
                    />
                </Pressable>
            </View>
        </View>
    )
}

function ClassroomsListItem({ _id, number_student, level, end_date, start_date, classname, isJoined }) {

    return (
        <View style={AppStyles.ClassroomsListItem}>
            <View style={AppStyles.ClassroomsListItemHeader}>
                <View><Text style={AppStyles.ClassroomsListItemHeaderClassName}>{`${classname}`}</Text></View>
                <View>
                    {isJoined && <Text style={AppStyles.ClassroomsListItemHeaderJoined}>{`Joined`}</Text>}
                </View>
            </View>
            <View style={AppStyles.ClassroomListItemBody}>
                <View style={AppStyles.ClassroomListItemBodyInfoView}>
                    <Ionicons name="person" color="black" size={18} />
                    <Text style={AppStyles.ClassroomsListItemText}>
                        {`${number_student}`}
                    </Text>
                </View>
                <View style={AppStyles.ClassroomListItemBodyInfoView}>
                    <Ionicons name="calendar" color="black" size={20} />
                    <Text style={AppStyles.ClassroomsListItemText}>
                        {`${dateStrFormatGetDate(end_date)}\n${dateStrFormatGetDate(start_date)}`}
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