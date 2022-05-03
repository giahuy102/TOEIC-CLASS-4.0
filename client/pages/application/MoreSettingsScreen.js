import { useState, useEffect } from "react";
import { Button, View, Text, Pressable } from "react-native";

import AppStyles from "../../styles/SystemFontStyles.scss";

export default function MoreSettingsScreen({ navigation, route }) {
    return (
        <View style={AppStyles.container}>
            <Text>More Settings Screen</Text>
            <Pressable style={AppStyles.MoreSettingsScreenButton} onPress={() => navigation.navigate("AboutUsScreen")}>
                <Text style={AppStyles.MoreSettingsScreenButtonText}>About Us</Text>
            </Pressable>
        </View>
    )
}