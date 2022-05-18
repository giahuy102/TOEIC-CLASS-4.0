import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Button } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import AppStyles from "../../../styles/ClassroomDetailScreen.scss";

export default function ClassroomDetailScreen({ navigation, route }) {
    const routeParams = route.params;
    const { _id, teacherId, numberStudent, level, end_date, start_date, classname } = routeParams;
    useEffect(() => {
        if (routeParams && routeParams.classname) {
            navigation.setOptions({
                title: routeParams.classname
            });
        }
    }, [])

    const buttonInfoList = [
        { buttonName: 'Challenge', buttonDescription: 'Challenge Classmate\nRandom Test', routeName: 'ClassroomChallengesStackScreen' },
        { buttonName: 'Challenge', buttonDescription: 'Challenge Classmate\nRandom Test', routeName: 'ClassroomChallengesStackScreen' },
        { buttonName: 'Challenge', buttonDescription: 'Challenge Classmate\nRandom Test', routeName: 'ClassroomChallengesStackScreen' }
    ]

    console.log(buttonInfoList);

    return (
        <View style={AppStyles.ClassroomDetailScreenContainer}>
            <View style={AppStyles.ClassroomDetailScreenHeader}>
                <View style={AppStyles.ClassroomDetailScreenHeaderInfoView}>
                    <Ionicons name="person" color="black" size={18} />
                    <Text style={AppStyles.ClassroomsListItemText}>
                        {`${numberStudent}`}
                    </Text>
                </View>
                <View style={AppStyles.ClassroomDetailScreenHeaderInfoView}>
                    <Ionicons name="calendar" color="black" size={20} />
                    <Text style={AppStyles.ClassroomsListItemText}>
                        {`${end_date}\n${start_date}`}
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
                {buttonInfoList.map((buttonInfo) => (
                    <Pressable
                        onPress={() => navigation.navigate(buttonInfo.routeName)}
                        style={AppStyles.ClassoomDetailScreenButtonView}
                    >
                        <Text style={AppStyles.ClassroomDetailScreenButtonNameText}>{buttonInfo.buttonName}</Text>
                        <Text style={AppStyles.ClassroomDetailScreenButtonDescriptionText}>{buttonInfo.buttonDescription}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    )
}
