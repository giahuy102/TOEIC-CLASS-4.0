import React, { useState } from "react";
import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "./profile/Profile";
import ClassroomsListScreen from "./classrooms/ClassroomsListScreen";
import MoreSettingsScreen from "./more/MoreSettingsScreen";

import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default function MainTabScreen({ navigation, route }) {
    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "ClassroomsListScreen") {
                        iconName = focused ? "school" : "school";
                    } else if (route.name === "Profile") {
                        iconName = focused ? "person" : "person";
                    } else if (route.name === "MoreSettingsScreen") {
                        iconName = focused ? "settings" : "settings";
                    }
                    return <Ionicons name={iconName} color={color} size={24} />
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#2E90FA',
                tabBarInactiveTintColor: 'grey',
            })}
        >
            <Tab.Screen name="ClassroomsListScreen" component={ClassroomsListScreen} options={{ title: "Your Classrooms" }} />
            <Tab.Screen name="Profile" component={Profile} options={{ title: "Profile" }} />
            <Tab.Screen name="MoreSettingsScreen" component={MoreSettingsScreen} options={{ title: "Settings" }} />
        </Tab.Navigator>
    );
}