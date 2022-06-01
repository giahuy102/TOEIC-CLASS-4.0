import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

// fetchChallengeDataById Object {
//     "__v": 2,
//     "_id": "629625ed9cc9feea2194f662",
//     "challenge_id": Object {
//       "__v": 0,
//       "_id": "629625ec9cc9feea2194f652",
//       "challenge_id": 1654007276248,
//       "classroom_id": "628ca9fabe5bca565a739fe8",
//       "create_user_id": "628ca9dbbe5bca565a739fa6",
//       "created_at": "2022-05-31T14:27:56.221Z",
//       "created_by": "hdthinh01",
//       "end": "2022-05-31T14:30:11.887Z",
//       "start": "2022-05-31T14:27:11.887Z",
//       "status": 2,
//       "test_id": "628ccdd19cf450d2896472ab",
//       "title": "Reading Test 100",
//     },
//     "classroom_id": "628ca9fabe5bca565a739fe8",
//     "currentTime": "2022-05-31T14:30:09.531Z",
//     "currentTimeLeft": 2356,
//     "end": "2022-05-31T14:30:11.887Z",
//     "rankingChart": Array [
//       Object {
//         "_id": "629625fb9cc9feea2194f6e4",
//         "answers": 2,
//         "score": 2,
//         "user_id": "628ca9dbbe5bca565a739fa6",
//         "username": "hdthinh01",
//       },
//       Object {
//         "_id": "629625fc9cc9feea2194f716",
//         "answers": 4,
//         "score": 3,
//         "user_id": "628cd8ee8401efecab84ccb2",
//         "username": "hdthinh1012",
//       },
//     ],
//     "start": "2022-05-31T14:27:11.887Z",
//     "status": 0,
//     "test_id": "628ccdd19cf450d2896472ab",
//     "title": "Reading Test 100",
//   }

function compareRankingChartItemByScore(a, b) {
    if (a.score < b.score) {
        return 1; /** Above 0 number means must swap */
    } else if (a.score > b.score) {
        return -1;
    }
    return 1;
}

export default function ChallengeResult({ navigation, route }) {
    console.log("[ChallengeResult.js] route.params", route.params);
    const [displayRankingChart, setDisplayRankingChart] = useState([]);
    const [challengeTitle, setChallengeTitle] = useState("");
    const [challengeId, setChallengeId] = useState("");
    const [challengeEndDate, setChallengeEndDate] = useState("");

    let challengeRealTimeRankingChart = useSelector(state => state.challengeRealTime.rankingChart);
    const challengeRealTimeChallengeId = useSelector(state => state.challengeRealTime.challenge_id);

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

    React.useEffect(async () => {
        if (route.params.dataSource === "challengeRealTime Redux RankingChart") {
            console.log('UseEffect challengeRealTime Redux RankingChart case, challengeId: ', challengeRealTimeChallengeId);
            try {
                const fetchChallengeById = await axios.get(`http://10.0.2.2:3001/api/challenge/get_challenge/${challengeRealTimeChallengeId}`);
                console.log('[ChallengeResult.js, challengeRealTime Redux RankingChart Case] fetchChallengeById', fetchChallengeById.data);
                /**
                 * checking why challengeRealTimeRankingChart.sort(compareRankingChartItemByScore) error
                 * Because challengeRealTimeRankingChart was actually an MongoBSON Object has been freezed using
                 * Javascript built-in Object.freeze() 
                 * 
                 * Solution: Using ArrCopy = [...oldArr] to create new version
                 */
                // console.log('[ChallengeResult.js] challengeRealTimeRankingChart', challengeRealTimeRankingChart);
                // setDisplayRankingChart(challengeRealTimeRankingChart.sort(compareRankingChartItemByScore));
                let sortedChallengeRealTimeRankingChart = [...challengeRealTimeRankingChart];
                setDisplayRankingChart(sortedChallengeRealTimeRankingChart.sort(compareRankingChartItemByScore));
                setChallengeTitle(fetchChallengeById.data.title);
                setChallengeId(challengeRealTimeChallengeId);
                setChallengeEndDate('Not yet ended');
            } catch (err) {
                console.log(`[ChallengeResult.js] const fetchChallengeById = await axios.get(http://10.0.2.2:3001/api/challenge/get_challenge/${challengeRealTimeChallengeId}); ERROR`, err);
            }
        } else if (route.params.dataSource === "/get_challenge_events_record_detail/:challenge_id API") {
            const fetchChallengeDataById = await axios.get(`http://10.0.2.2:3001/api/challenge/get_challenge_events_record_detail/${route.params.challenge_id}`);
            console.log('[ChallengeResult.js] fetchChallengeDataById', fetchChallengeDataById.data);
            setDisplayRankingChart(fetchChallengeDataById.data.rankingChart.sort(compareRankingChartItemByScore));
            const { challenge_id: challengeData } = fetchChallengeDataById.data;
            setChallengeTitle(challengeData.title);
            setChallengeId(challengeData._id);
            setChallengeEndDate(challengeData.end);
        }
    }, [])

    const FlatListItem = (item, index) => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', width: '95%', marginTop: 20 }}>
                <Text style={{ color: 'red', fontWeight: 'bold', textAlign: 'center', width: '20%' }} >{index}</Text>
                <Text style={{ textAlign: 'center', width: '60%' }}>{item.username}</Text>
                <Text style={{ textAlign: 'center', width: '20%' }}>{item.score}</Text>
            </View>
        );
    }

    const FlatListHeader = (item, index) => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', width: '95%', marginTop: 20 }}>
                <Text style={{ textAlign: 'center', width: '20%', color: '#1570EF', fontWeight: 'bold', fontSize: 17 }}>{item.index}</Text>
                <Text style={{ textAlign: 'center', width: '60%', color: '#1570EF', fontWeight: 'bold', fontSize: 17 }}>{item.username}</Text>
                <Text style={{ textAlign: 'center', width: '20%', color: '#1570EF', fontWeight: 'bold', fontSize: 17 }}>{item.score}</Text>
            </View>
        );
    }

    const header_data = [{ "index": "Rank", "username": "Name", "score": "Score" }];

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 10, }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Challenge: <Text style={{ fontWeight: 'normal' }}>{challengeTitle}</Text> </Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>ID: <Text style={{ fontWeight: 'normal' }}>{challengeId}</Text> </Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Ended: <Text style={{ fontWeight: 'normal' }}>{challengeEndDate}</Text> </Text>
            </View>

            <FlatList
                style={{ height: '10%' }}
                data={header_data}
                renderItem={({ item, index }) => {
                    // console.log(`item = ${JSON.stringify(item)}, index = ${index}`)
                    return (
                        FlatListHeader(item, index)
                    );
                }}
                keyExtractor={(item) => item.username}
            />

            <FlatList
                data={displayRankingChart}
                renderItem={({ item, index }) => {
                    // console.log(`item = ${JSON.stringify(item)}, index = ${index}`)
                    return (
                        FlatListItem(item, index)
                    );
                }}
                keyExtractor={(item) => item.username}
            />
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