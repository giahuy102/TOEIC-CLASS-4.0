import React, { useState } from "react";
import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "./Profile";
import ClassroomsListScreen from "./ClassroomsListScreen";
import ClassroomDetailScreen from "./ClassroomDetailScreen";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default function MainTabScreen({ navigation, route }) {
    return (
        <Tab.Navigator>
            <Tab.Screen name="ClassroomsListScreen" component={ClassroomsListScreen} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}