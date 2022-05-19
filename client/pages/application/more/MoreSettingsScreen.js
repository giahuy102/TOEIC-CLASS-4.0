import { useState, useEffect } from "react";
import { Button, View, Text, Pressable } from "react-native";

import AppStyles from "../../../styles/MoreSettingsScreen";

export default function MoreSettingsScreen({ navigation, route }) {
    return (
        <View style={AppStyles.container}>
            <Text>More Settings Screen</Text>
            <Pressable style={AppStyles.MoreSettingsScreenButton} onPress={() => navigation.navigate("AboutUsScreen")}>
                <Text style={AppStyles.MoreSettingsScreenButtonText}>About Us</Text>
            </Pressable>

            {/* <Pressable style={AppStyles.MoreSettingsScreenButton} onPress={() => navigation.navigate("StartScreen")}>
                <Text style={AppStyles.MoreSettingsScreenButtonText}>Navigate To Start Screen For Demo</Text>
            </Pressable> */}
        </View>
    )
}