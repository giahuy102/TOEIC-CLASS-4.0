import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native";

export default function ClassroomDetailScreen({ navigation, route }) {
    return (<View style={styles.container}>
        <Text>{"Classrooms Detail Screen"}</Text>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});