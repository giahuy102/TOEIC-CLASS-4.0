import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import data from './Ignored_Challenge/DATA.json'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Challenge from './Challenge';

// import Challenge from './Challenge.jsx';

import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();


export default function Temp({ navigation, route }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
                return (
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={require('../assets/back_arrow.png')} />
                    </TouchableOpacity>
                );

            },
        });
    }, [navigation]);


    return (

        <Tab.Navigator
            // screenOptions={({ route, navigation }) => ({
            //     tabBarIcon: ({ focused, color, size }) => {
            //         let iconName;
            //         if (route.name === "ClassroomsListScreen") {
            //             iconName = focused ? "school" : "school";
            //         } else if (route.name === "Profile") {
            //             iconName = focused ? "person" : "person";
            //         } else if (route.name === "MoreSettingsScreen") {
            //             iconName = focused ? "settings" : "settings";
            //         }
            //         return <Ionicons name={iconName} color={color} size={24} />
            //     },
            //     tabBarShowLabel: false,
            //     tabBarActiveTintColor: '#2E90FA',
            //     tabBarInactiveTintColor: 'grey',
            // })}
            initialRouteName='Home'
            // tabBarOptions={{
            //     activeTintColor: '#1570EF',
            //     inactiveTintColor: '#98A2B3',
            //     labelStyle: { fontWeight: 'bold' },
            // }}
            screenOptions={{
                tabBarInactiveTintColor: '#98A2B3',
                tabBarActiveTintColor: '#1570EF',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                // activeBackgroundColor: 'red',
                // inactiveBackgroundColor: 'blue',
                // headerStyle: {
                //     backgroundColor: '#f4511e',
                // },
                // headerTintColor: '#fff',
                // headerTitleStyle: {
                //     fontWeight: 'bold',
                // },
            }}
        >
            <Tab.Screen name="ClassroomsListScreen" component={Challenge} options={{ title: "Challenging" }} />
            <Tab.Screen name="Profile" component={Challenge} options={{ title: "Upcoming" }} />
            <Tab.Screen name="MoreSettingsScreen" component={Challenge} options={{ title: "Ended" }} />
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