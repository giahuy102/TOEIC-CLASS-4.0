import * as React from "react";
import { useState } from "react";
import { View, Text, Pressable } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppStyles from "../../../styles/SystemFontStyles";

import Challenge from "./Challenge";
import ChallengeCreate from "./ChallengeCreate";
import ChallengeResult from "./ChallengeResult";
import ChallengeTest from "./ChallengeTest";
import Temp from "./Temp";

export default function ClassroomChallengesStackScreen({ navigation, route }) {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName="Challenge"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: AppStyles.HeaderTitleStyle,
            }}
        >
            <Stack.Screen name="Challenge" component={Challenge} />
            <Stack.Screen name="ChallengeCreate" component={ChallengeCreate} />
        </Stack.Navigator>
    );
}