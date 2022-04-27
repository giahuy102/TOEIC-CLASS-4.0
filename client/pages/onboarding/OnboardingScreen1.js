import react, { useState } from "react"
import { Button, Text, StyleSheet, View } from "react-native";

export default OnboardingScreen1 = ({ props }) => {
    return (
        <View style={styles.container}>
            <Text>{"OnboardingScreen1"}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});