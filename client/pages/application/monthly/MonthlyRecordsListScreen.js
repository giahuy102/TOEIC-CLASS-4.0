import React, { useState } from "react";
import { Text, View, Pressable, FlatList } from "react-native"

import MonthlyRecordsData from "./fakeData/MonthlyRecordsFakeData.json"

import AppStyles from "../../../styles/MonthlyRecordsListScreen.scss";

function MonthlyRecordItem(item, navigation, route) {

    console.log("Item", item);
    return (
        <Pressable
            style={[AppStyles.MonthlyRecordsListScreenItem, { elevation: 5 }]}
            onPress={() => {
                navigation.navigate("MonthlyRecordDetailScreen", {
                    recordList: item.recordList,
                    month: item.month,
                    year: item.year,
                })
            }}
        >
            <View><Text style={AppStyles.MonthlyRecordsListScreenItemLeftText}>{`${item["month"]}`}</Text></View>
            <View><Text style={AppStyles.MonthlyRecordsListScreenItemRightText}>
                {`${item["month"]} ${item["year"]}\nNo of Students:${item["recordList"].length}`}
            </Text></View>
        </Pressable>
    )
}

export default function MonthlyRecordsListScreen({ navigation, route }) {
    const ClassName = MonthlyRecordsData[0].classname;

    return (
        <View style={AppStyles.MonthlyRecordsListScreenContainer}>
            <Text style={AppStyles.MonthlyRecordsListScreenClassNameText}>Class Name: {ClassName}</Text>
            <FlatList
                data={MonthlyRecordsData}
                renderItem={({ item, index }) => MonthlyRecordItem(item, navigation, route)}
                keyExtractor={(item) => {
                    return `${item.classname},${item.month},${item.year}`
                }}
            />
        </View>
    );
}