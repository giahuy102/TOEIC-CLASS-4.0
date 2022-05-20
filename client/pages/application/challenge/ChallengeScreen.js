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

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
                return (
                    // <TouchableOpacity onPress={() => navigation.pop()}>
                    <TouchableOpacity onPress={() => navigation.navigate('ClassroomDetailScreen', 1)}>
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
            <Tab.Screen name="ClassroomsListScreen" component={ChallengeChallenging} options={{ title: "Challenging" }} />
            <Tab.Screen name="Profile" component={ChallengeUpcoming} options={{ title: "Upcoming" }} />
            <Tab.Screen name="MoreSettingsScreen" component={ChallengeEnded} options={{ title: "Ended" }} />
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