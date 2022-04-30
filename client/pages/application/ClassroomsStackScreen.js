import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ClassroomDetailScreen from "./ClassroomDetailScreen";
import MainTabScreen from "./MainTabScreen";

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

            <Stack.Screen name="MainTabScreen" component={MainTabScreen} options={{ headerBackStyle: { display: 'None' } }} />

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