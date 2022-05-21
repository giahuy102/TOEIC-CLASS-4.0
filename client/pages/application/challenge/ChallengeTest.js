import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import data from '../../Ignored_Challenge/TEST_DATA.json';
import TestService from '../../../services/TestService';


export default function ChallengeTest({ navigation, route }) {

    const ChallengeItemData = route.params;
    console.log('ChallengeTest.js ChallengeItemData', ChallengeItemData);

    React.useLayoutEffect(() => {
        navigation.setOptions({
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

    const handleStartChallengeFeature = async () => {
        const ChallengeTestId = ChallengeItemData.test_id;
        try {
            const ChallengeTestDetailInfoResponse = await TestService.getTestDetailById(ChallengeTestId);
            const ChallengeTestDetailInfoData = ChallengeTestDetailInfoResponse.data;
            console.log('ChallengeTest.js ChallengeTestDetailInfo', JSON.stringify(ChallengeTestDetailInfoData));
            alert('To the Test');
        } catch (err) {
            console.log('ChallengeTest.js: const ChallengeTestDetailInfo = await TestService.getTestDetailById(ChallengeTestId);', err)
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 20, borderWidth: 2, borderColor: '#1570EF', borderRadius: 5, padding: 15 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Challenge: <Text style={{ fontWeight: 'normal' }}>{route.params['title']}</Text> </Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>ID: <Text style={{ fontWeight: 'normal' }}>{route.params['challenge_id']}</Text> </Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Start: <Text style={{ fontWeight: 'normal' }}>{new Date(route.params['start']).toLocaleString()}</Text> </Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>End: <Text style={{ fontWeight: 'normal' }}>{new Date(route.params['end']).toLocaleString()}</Text> </Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Score: <Text style={{ fontWeight: 'normal' }}>{data[0].score}</Text> </Text>
            </View>

            <View style={{ marginTop: 40, width: '25%' }}>
                {data[0].score != "none" ?
                    <Button
                        borderRadius='10'
                        color="#1570EF"
                        title='Start'
                        onPress={() => handleStartChallengeFeature()}
                    />
                    :
                    <Button
                        borderRadius='10'
                        color="#1570EF"
                        title='Done'
                        onPress={() => alert('Done')}
                    />
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center'
        // width: 100
    },

});