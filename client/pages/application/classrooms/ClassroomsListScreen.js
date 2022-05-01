import * as React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Modal, Alert, Pressable } from "react-native";
import { Button } from "react-native";

import AddClassroomPopupModal from "./AddClassroomPopupModal";

import AppStyles from "../../../styles/SystemFontStyles.scss";

export default function ClassroomsListScreen({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={AppStyles.container}>
            <Button
                title="Navigate to Classroom Detail Screen"
                onPress={() => { navigation.navigate("ClassroomDetailScreen") }}
            />
            <Modal
                animationType="fade"
                hasBackDrop={false}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed!");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={AppStyles.ModalContainer}>
                    <AddClassroomPopupModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
                </View>
            </Modal>
            <View style={AppStyles.ClassroomsListScreenAddClassroomButtonView}>
                <Pressable
                    style={AppStyles.ClassroomsListScreenAddClassroomButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={AppStyles.ClassroomsListScreenAddClassroomButtonText}>+</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 0
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
