import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import data from '../../Ignored_Challenge/TEST_DATA.json';

export default function ChallengeTest({ navigation, route }) {

    const ChallengeItemData = route.params;
    const currentUserId = useSelector(state => state.profile._id);
    const [challengeParticipationScore, setChallengeParticipationScore] = useState(null);

    // console.log('ChallengeTest.js ChallengeItemData', ChallengeItemData);

    React.useEffect(async () => {
        try {
            console.log(`Calling Api: http://10.0.2.2:3001/get_challenge_participation_detail/${ChallengeItemData._id}/${currentUserId}`)
            const fetchChallengeParticipationModelData = await axios.get(`http://10.0.2.2:3001/api/challenge/get_challenge_participation_detail/${ChallengeItemData._id}/${currentUserId}`);
            console.log('[ChallengeTest.js] fetchChallengeParticipationModelData', fetchChallengeParticipationModelData.data.score);
            if (fetchChallengeParticipationModelData.data.score) {
                setChallengeParticipationScore(fetchChallengeParticipationModelData.data.score.toFixed(2));
            }
        } catch (err) {
            console.log(`[ChallengeTest.js] useEffect error: ${err}`);
        }
    }, [])

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
        const ChallengeClassId = ChallengeItemData.class_id;
        const ChallengeId = ChallengeItemData._id;
        try {
            /**
             * 
             *              STARTING CHALLENGE FEATURE
             * 
             */
            navigation.navigate('ChallengeRealTimeStackScreen', { ChallengeId, ChallengeTestId, ChallengeClassId });


        } catch (err) {
            console.log('ChallengeTest.js: const ChallengeTestDetailInfo = await TestService.getTestDetailById(ChallengeTestId);', err)
        }
    }

    console.log('challengeParticipationScore === null', challengeParticipationScore === null);

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 20, borderWidth: 2, borderColor: '#1570EF', borderRadius: 5, padding: 15 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Challenge: <Text style={{ fontWeight: 'normal' }}>{route.params['title']}</Text> </Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>ID: <Text style={{ fontWeight: 'normal' }}>{route.params['challenge_id']}</Text> </Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Start: <Text style={{ fontWeight: 'normal' }}>{new Date(route.params['start']).toLocaleString()}</Text> </Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>End: <Text style={{ fontWeight: 'normal' }}>{new Date(route.params['end']).toLocaleString()}</Text> </Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Score: <Text style={{ fontWeight: 'normal' }}>{challengeParticipationScore}</Text> </Text>
            </View>

            <View style={{ marginTop: 40, width: '25%' }}>
                {(!challengeParticipationScore) ?
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