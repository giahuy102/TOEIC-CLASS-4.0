import * as React from "react";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Image } from "react-native";
import { Button } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import AppStyles from "../../../styles/ClassroomDetailScreen.scss";

import { dateStrFormatGetDate } from "../../../utils/dateStrConverter";

export default function ClassroomDetailScreen({ navigation, route }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return (
                    // <TouchableOpacity onPress={() => navigation.pop()}>
                    // <TouchableOpacity onPress={() => navigation.navikgate('StartScreen')}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={require('../../../assets/back_arrow.png')} />

                    </TouchableOpacity>
                );

            },
        });
    }, [navigation]);

    const routeParams = route.params;
    const { _id: classId, teacherId, number_student, level, end_date, start_date, classname } = routeParams;

    // console.log('ClassroomDetailScreen classId', classId);

    useEffect(() => {
        if (routeParams && routeParams.classname) {
            navigation.setOptions({
                title: routeParams.classname
            });
        }
    }, [])

    const buttonInfoList = [
        { buttonName: 'Challenge', buttonDescription: 'Challenge Classmate\nRandom Test', routeName: 'ClassroomChallengesStackScreen', params: { classId } },
        { buttonName: 'Student List', buttonDescription: 'Class Members\nStudent Details', routeName: 'ClassMember', params: { classId } },
        { buttonName: 'Your Result', buttonDescription: 'Each Tests Result\nReview', routeName: 'Result', params: { classId } },
        { buttonName: 'Test Lists', buttonDescription: 'Create View Test\nTeacher Only', routeName: 'Exams', params: { classId } },
        { buttonName: 'Monthly Record', buttonDescription: 'View Monthly\nRanking', routeName: 'MonthlyRecordsListScreen', params: { classId } }
    ]

    return (
        <View style={AppStyles.ClassroomDetailScreenContainer}>
            <View style={AppStyles.ClassroomDetailScreenHeader}>
                <View style={AppStyles.ClassroomDetailScreenHeaderInfoView}>
                    <Ionicons name="person" color="black" size={18} />
                    <Text style={AppStyles.ClassroomsListItemText}>
                        {`${number_student}`}
                    </Text>
                </View>
                <View style={AppStyles.ClassroomDetailScreenHeaderInfoView}>
                    <Ionicons name="calendar" color="black" size={20} />
                    <Text style={AppStyles.ClassroomsListItemText}>
                        {`${dateStrFormatGetDate(start_date)}\n${dateStrFormatGetDate(end_date)}`}
                    </Text>
                </View>
                <View style={AppStyles.ClassroomDetailScreenHeaderInfoView}>
                    <Ionicons name="school" color="black" size={22} />
                    <Text style={AppStyles.ClassroomsListItemText}>
                        {`Toeic ${level}`}
                    </Text>
                </View>
            </View>
            <View style={AppStyles.ClassroomDetailScreenBody}>
                {buttonInfoList.map((buttonInfo) => {
                    // console.log('ClassroomDetailScreen buttonInfo params', buttonInfo.params);
                    return (
                        <Pressable
                            key={buttonInfo.buttonName}
                            onPress={() => navigation.navigate(buttonInfo.routeName, buttonInfo.params)}
                            style={AppStyles.ClassoomDetailScreenButtonView}
                        >
                            <Text style={AppStyles.ClassroomDetailScreenButtonNameText}>{buttonInfo.buttonName}</Text>
                            <Text style={AppStyles.ClassroomDetailScreenButtonDescriptionText}>{buttonInfo.buttonDescription}</Text>
                        </Pressable>
                    )
                })}
            </View>
        </View>
    )
}
