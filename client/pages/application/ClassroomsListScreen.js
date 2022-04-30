import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native";

export default function ClassroomsListScreen({ navigation, route }) {
    return (<View style={styles.container}>
        <Text>{"Classrooms List Screen"}</Text>
        <Button
            title="Navigate to Classroom Detail Screen"
            onPress={() => { navigation.navigate("ClassroomDetailScreen") }}
        />
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