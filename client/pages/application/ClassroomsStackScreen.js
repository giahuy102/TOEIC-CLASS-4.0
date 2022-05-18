import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ClassroomDetailScreen from "./classrooms/ClassroomDetailScreen";
import ClassroomChallengesStackScreen from "./challenge/ClassroomChallengesStackScreen";
import MainTabScreen from "./MainTabScreen";
import AboutUsScreen from "./more/AboutUsScreen";
import MonthlyRecordsListScreen from "./monthly/MonthlyRecordsListScreen";
import MonthlyRecordDetailScreen from "./monthly/MonthlyRecordDetailScreen";

import AppStyles from "../../styles/SystemFontStyles.scss";

const Stack = createNativeStackNavigator();

export default function ClassroomsStackScreen({ navigation, route }) {
    return (
        <Stack.Navigator initialRouteName="MainTabScreen"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: AppStyles.HeaderTitleStyle,
            }}
        >
            <Stack.Screen name="ClassroomDetailScreen" component={ClassroomDetailScreen} />
            <Stack.Screen name="ClassroomChallengesStackScreen" component={ClassroomChallengesStackScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} options={{
                title: "About Us"
            }} />
            <Stack.Screen name="MainTabScreen" component={MainTabScreen} options={{
                headerBackStyle: { display: 'None' },
                title: "Toeic E-Class 4.0"
            }} />


            <Stack.Group>
                <Stack.Screen name="MonthlyRecordsListScreen" component={MonthlyRecordsListScreen} options={{
                    title: "Monthly Record"
                }} />
                <Stack.Screen name="MonthlyRecordDetailScreen" component={MonthlyRecordDetailScreen} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
        // width: 100
    },
});