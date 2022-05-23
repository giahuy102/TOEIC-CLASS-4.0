import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChallengeDoingSection from "./ChallengeDoingSection";
import ChallengeRanking from "./ChallengeRanking";

import AppStyles from "../../../../styles/SystemFontStyles";

import { SocketClient } from '../socketClient/SocketClient';
import { initiateChallengeRealTimeSocket, destroyChallengeRealTimeSocket } from '../slice/challengeRealTimeSlice';

/**
 * Contain the pointer to the SocketClient object
 */
let challengeRealTimeSocketClient = {};

export default function ChallengeRealTimeStackScreen({ navigation, route }) {
    const dispatch = useDispatch();
    const examState = useSelector(state => state.challengeRealTime.examState);

    const { ChallengeId: challenge_id, ChallengeClassId: class_id } = route.params;
    const user_id = useSelector(state => state.profile._id);


    useEffect(() => {
        /**
         * The 'navigation' is belong to ClassroomChallengesStackScreen
         */
        challengeRealTimeSocketClient = new SocketClient(user_id, challenge_id, class_id, dispatch, navigation);
        dispatch(initiateChallengeRealTimeSocket(challengeRealTimeSocketClient));
        return () => {
            dispatch(destroyChallengeRealTimeSocket(challengeRealTimeSocketClient));
            challengeRealTimeSocketClient = {};
        };
    }, [])


    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName={`ChallengeDoingSection`}
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: AppStyles.HeaderTitleStyle,
            }}
        >
            <Stack.Group>
                {examState.map(sectionData => (
                    <Stack.Screen
                        name={`ChallengeDoingSection${sectionData.key}`}
                        component={ChallengeDoingSection}
                        initialParams={{
                            sectionIndex: sectionData.key,
                            lastSectionIndex: examState.length - 1,
                            challengeRealTimeSocketClient
                        }}
                        options={{
                            title: `Section ${sectionData.key}`,
                            animation: 'slide_from_right',
                        }}
                    />
                ))}
            </Stack.Group>

            <Stack.Group>
                <Stack.Screen
                    name={'ChallengeRanking'}
                    component={ChallengeRanking}
                    initialParams={{
                        challengeRealTimeSocketClient
                    }}
                    options={{
                        title: 'Current Ranking',
                        animation: 'slide_from_left',
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
} 