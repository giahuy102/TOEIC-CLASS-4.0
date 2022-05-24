import * as React from "react";
import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppStyles from "../../../styles/SystemFontStyles";

import ChallengeDoingSection from "./ChallengeDoingSection"
import ChallengeScreen from "./ChallengeScreen";
import ChallengeCreate from "./ChallengeCreate";
import ChallengeTest from "./ChallengeTest";
import ChallengeResult from "./ChallengeResult";
import ChallengeRanking from "./ChallengeRanking";

export default function ClassroomChallengesStackScreen({ navigation, route }) {

    const { classId } = route.params
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName="ChallengeScreen"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: AppStyles.HeaderTitleStyle,

            }}
        >

            <Stack.Screen
                name="ChallengeTest"
                component={ChallengeTest}
                options={{ title: 'Taking challenge test' }}
                initialParams={{ classId }}

            />

            <Stack.Screen
                name="ChallengeResult"
                component={ChallengeResult}
                options={{ title: 'Result' }}
                initialParams={{ classId }}
            />

            <Stack.Screen
                name="ChallengeScreen"
                component={ChallengeScreen}
                options={{ title: 'Challenge' }}
                initialParams={{ classId }}
            />

            <Stack.Screen
                name="ChallengeCreate"
                component={ChallengeCreate}
                options={{ title: 'Create new challenge' }}
                initialParams={{ classId }}

            />

            <Stack.Screen
                name="ChallengeDoingSection"
                component={ChallengeDoingSection}
                options={{ title: 'Doing test section' }}
            // initialParams={{ classId }}

            />

            <Stack.Screen
                name="ChallengeRanking"
                component={ChallengeRanking}
                options={{
                    title: 'Ranking challenge',
                    animation: 'slide_from_left'
                }}
            // initialParams={{ classId }}

            />


        </Stack.Navigator>
    );
}