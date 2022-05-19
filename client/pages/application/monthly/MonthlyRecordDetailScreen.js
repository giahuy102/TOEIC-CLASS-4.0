import React, { useState } from "react";
import { Text, View, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native"

import AppStyles from "../../../styles/MonthlyRecordDetailScreen";

export default function MonthlyRecordDetailScreen({ navigation, route }) {
    const { recordList, month, year } = route.params;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: `${month} ${year}`,
            headerLeft: () => {
                // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
                return (
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={require('../../../assets/back_arrow.png')} />

                    </TouchableOpacity>
                );

            },
        });
    }, [navigation]);

    const FlatListItem = (item, index) => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', width: '95%', marginTop: 20 }}>
                <Text style={{ color: 'red', fontWeight: 'bold', textAlign: 'center', width: '10%' }} >{item.key}</Text>
                <Text style={{ textAlign: 'center', width: '45%' }}>{item.name}</Text>
                <Text style={{ textAlign: 'center', width: '35%' }}>{item.id}</Text>
                <Text style={{ textAlign: 'center', width: '10%' }}>{item.score}</Text>
            </View>
        );
    }

    const FlatListHeader = (item, index) => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', width: '95%', marginTop: 20 }}>
                <Text style={{ textAlign: 'center', width: '15%', color: '#1570EF', fontWeight: 'bold', fontSize: 17 }}>{item.key}</Text>
                <Text style={{ textAlign: 'center', width: '40%', color: '#1570EF', fontWeight: 'bold', fontSize: 17 }}>{item.name}</Text>
                <Text style={{ textAlign: 'center', width: '30%', color: '#1570EF', fontWeight: 'bold', fontSize: 17 }}>{item.id}</Text>
                <Text style={{ textAlign: 'center', width: '15%', color: '#1570EF', fontWeight: 'bold', fontSize: 17 }}>{item.score}</Text>
            </View>
        );
    }

    const header_data = [{ "key": "Rank", "name": "Name", "id": "ID", "score": "Score" }];

    return (
        <View style={AppStyles.MonthlyRecordDetailScreenContainer}>
            <FlatList
                style={{ height: '10%' }}
                data={header_data}
                renderItem={({ item, index }) => {
                    // console.log(`item = ${JSON.stringify(item)}, index = ${index}`)
                    return (
                        FlatListHeader(item, index)
                    );
                }}
            >

            </FlatList>

            <FlatList
                data={recordList}
                renderItem={({ item, index }) => {
                    // console.log(`item = ${JSON.stringify(item)}, index = ${index}`)
                    return (
                        FlatListItem(item, index)
                    );
                }}
            >

            </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center'
        // width: 100
    }
});