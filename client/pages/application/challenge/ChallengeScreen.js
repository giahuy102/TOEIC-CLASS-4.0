import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import data from '../../Ignored_Challenge/DATA.json'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChallengeChallenging from './ChallengeChallenging';
import ChallengeUpcoming from './ChallengeUpcoming';
import ChallengeEnded from './ChallengeEnded';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();


export default function ChallengeScreen({ navigation, route }) {

    console.log('ClassroomDetailScreen routeParams', route.params);
    const { classId } = route.params;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
                return (
                    // <TouchableOpacity onPress={() => navigation.pop()}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={require('../../../assets/back_arrow.png')} />
                    </TouchableOpacity>
                );

            },
        });
    }, [navigation]);


    return (

        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                tabBarInactiveTintColor: '#98A2B3',
                tabBarActiveTintColor: '#1570EF',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}
        >
            <Tab.Screen
                name="ChallengeChallenging" component={ChallengeChallenging} options={{ title: "Challenging" }}
                initialParams={{ classId }}
            />
            <Tab.Screen
                name="ChallengeUpcoming" component={ChallengeUpcoming} options={{ title: "Upcoming" }}
                initialParams={{ classId }}
            />
            <Tab.Screen
                name="ChallengeEnded" component={ChallengeEnded} options={{ title: "Ended" }}
                initialParams={{ classId }}
            />
        </Tab.Navigator>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center'
        // width: 100
    },

});