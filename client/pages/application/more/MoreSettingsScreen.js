import { useState, useEffect } from "react";
import { Button, View, Text, Pressable } from "react-native";
import { CommonActions } from "@react-navigation/native";

import AppStyles from "../../../styles/MoreSettingsScreen";

import { removeKey } from '../../../services/JWTStorage'

export default function MoreSettingsScreen({ navigation, route }) {
    const handleLogout = () => {
        removeKey('jwt-token');
        navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{
                name: "Login"
            }]
        }));
    }

    return (
        <View style={AppStyles.container}>
            <Text>More Settings Screen</Text>
            <Pressable style={AppStyles.MoreSettingsScreenButton} onPress={() => navigation.navigate("AboutUsScreen")}>
                <Text style={AppStyles.MoreSettingsScreenButtonText}>About Us</Text>
            </Pressable>

            <Pressable style={AppStyles.MoreSettingsScreenButton} onPress={() => handleLogout()}>
                <Text style={AppStyles.MoreSettingsScreenButtonText}>Logout</Text>
            </Pressable>
        </View>
    )
}