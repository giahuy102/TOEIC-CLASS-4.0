import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeviceEventEmitter } from "react-native";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChallengeDoingSection from "./ChallengeDoingSection";
import ChallengeRanking from "./ChallengeRanking";

import AppStyles from "../../../../styles/SystemFontStyles";

import { SocketClient } from '../socketClient/SocketClient';
import { initiateChallengeRealTimeSocket, destroyChallengeRealTimeSocket, socketEmitUserChooseAnAnswerEvent } from '../slice/challengeRealTimeSlice';

/**
 * Contain the pointer to the SocketClient object
 */
let challengeRealTimeSocketClient = {};
const initDeviceEventEmitter = (dispatch) => {
    DeviceEventEmitter.addListener('callbackUsingChallengeRealTimeSocketClient', async ({ dispatchAction, eventData }) => {
        // console.log("DeviceEventEmitter.addListener('callbackUsingChallengeRealTimeSocketClient', ...) event triggered");
        if (challengeRealTimeSocketClient) {
            dispatch(dispatchAction({ ...eventData, socket: challengeRealTimeSocketClient }))
        } else {
            // console.log("DeviceEventEmitter.addListener('challengeRealTimeSocketClientEmitEvent',...) Error: challengeRealTimeSocketClient not yet initializt to point to SocketClient, still a empty object {}");
        }
    })

}

export default function ChallengeRealTimeStackScreen({ navigation, route }) {
    const dispatch = useDispatch();
    initDeviceEventEmitter(dispatch);
    const examState = useSelector(state => state.challengeRealTime.examState);

    const { ChallengeId: challenge_id, ChallengeClassId: class_id } = route.params;
    const user_id = useSelector(state => state.profile._id);


    useEffect(() => {
        /**
         * The 'navigation' is belong to ClassroomChallengesStackScreen
         */
        challengeRealTimeSocketClient = new SocketClient(user_id, challenge_id, class_id, dispatch, navigation);
        dispatch(initiateChallengeRealTimeSocket(challengeRealTimeSocketClient));
        // return () => {
        //     dispatch(destroyChallengeRealTimeSocket(challengeRealTimeSocketClient));
        //     challengeRealTimeSocketClient = {};
        // };
        return () => {
        }
    }, [])


    const Stack = createNativeStackNavigator();


    return (
        <Stack.Navigator
            initialRouteName={examState[0] ? `ChallengeDoingSection${examState[0].key}` : `ChallengeDoingSection${0}`}
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: AppStyles.HeaderTitleStyle,
            }}
        >
            <Stack.Group>
                {examState.map(sectionData => (
                    <Stack.Screen
                        key={sectionData.key}
                        name={`ChallengeDoingSection${sectionData.key}`}
                        component={ChallengeDoingSection}
                        initialParams={{
                            sectionIndex: sectionData.key,
                            lastSectionIndex: examState.length - 1,
                        }}
                        options={{
                            title: `Section ${sectionData.key}`,
                            animation: 'slide_from_right',
                            headerBackVisible: false
                        }}
                    />
                ))}
            </Stack.Group>

            <Stack.Group>
                <Stack.Screen
                    name={'ChallengeRanking'}
                    component={ChallengeRanking}
                    initialParams={{
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