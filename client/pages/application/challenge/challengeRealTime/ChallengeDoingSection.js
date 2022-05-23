import React, { useEffect, useState } from 'react';
import { Modal, Button, StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
// import data from '../../Ignored_Challenge/RESULT_DATA.json'
// import MultipleChoice from 'react-native-multiple-choice-picker'
import ImageViewer from 'react-native-image-zoom-viewer';
import { RadioButton } from 'react-native-paper';
// import { createAppContainer } from '@react-navigation'
// import 'react-native-gesture-handler';
// import Animated from 'react-native-reanimated';
// import { createDrawerNavigator } from '@react-navigation/drawer';

import { useSelector, useDispatch } from 'react-redux';
import { socketEmitUserChooseAnAnswerEvent } from '../slice/challengeRealTimeSlice';

export default function ChallengeDoingSection({ navigation, route }) {
    const dispatch = useDispatch();
    const examState = useSelector(state => state.challengeRealTime.examState);
    const user_id = useSelector(state => state.profile._id);
    const challenge_id = useSelector(state => state.challengeRealTime.challenge_id);

    const { sectionIndex, lastSectionIndex, challengeRealTimeSocketClient } = route.params;
    const examStateSectionInfo = examState[sectionIndex]
    const [answersContainer, setAnswersContainer] = useState([])
    const [show, setShow] = useState(false)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
                return (
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={require('../../../../assets/back_arrow.png')} />

                    </TouchableOpacity>
                );

            }
        });
    }, [navigation]);

    useEffect(() => {
        setAnswersContainer(Array(examStateSectionInfo['questions'].length).fill(''))
    }, [])

    const updateSelection = (newValue, index) => {
        let theAnswer = newValue;
        let questionIndex = index;
        let isAnswerCorrected = null;
        const theQuestionInfo = examStateSectionInfo.questions[questionIndex];

        for (const answerInfo of theQuestionInfo.answers) {
            if (answerInfo.answer === theAnswer) {
                isAnswerCorrected = answerInfo.is_correct;
            }
        }

        let items = [...answersContainer]
        let item = { ...items[index] }
        item = newValue
        items[index] = item
        setAnswersContainer(items)
        /**
         * This will dispatch and emit socket event to Server to notify about
         * an True answer or Wrong answer by the user
         */
        dispatch(socketEmitUserChooseAnAnswerEvent({ socket: challengeRealTimeSocketClient, user_id, questionIndex, sectionIndex, theAnswer, isAnswerCorrected, challenge_id }))
    }

    const FlatListItem = (item, index) => {
        return (
            <View style={styles.question}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item['question']}</Text>

                <RadioButton.Group
                    onValueChange={newValue => {
                        if (answersContainer[index] === "") {
                            updateSelection(newValue, index);
                        }
                    }}
                    value={answersContainer[index]}
                >
                    {item['answers'].map(answerItem => (
                        <View key={answerItem['answer']} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value={answerItem['answer']} />
                            <Text style={{ fontSize: 15 }}>{answerItem['answer']}</Text>
                        </View>

                    ))}
                </RadioButton.Group>
            </View>

        );
    }

    const images = [{
        // Simplest usage.
        url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

        // width: number
        // height: number
        // Optional, if you know the image size, you can set the optimization performance

        // You can pass props to <Image />.
        props: {
            // headers: ...
        }
    }, {
        url: '',
        props: {
            // Or you can set source directory.
            source: require('../images/ex1.png')
        }
    }]

    const pressImageHandler = () => {
        setShow(!show)
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View style={styles.left}>
                    <TouchableOpacity onPress={() => navigation.navigate('ChallengeRanking')}>
                        <Image source={require('../images/ranking.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.right}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                        Time left:  <Text style={{ fontWeight: 'normal' }}>59:01</Text>
                    </Text>
                </View>
            </View>

            {/* for text */}
            {/* <View style={{ flexDirection: 'row' }}>
                <Text style={{ justifyContent: 'flex-start' }}>{data['section_questions']}</Text>
            </View> */}

            {/* for image */}
            <TouchableOpacity onPress={pressImageHandler}>
                <Image style={{ width: '100%', height: 100 }} source={require('../images/ex1.png')} />
                <Modal visible={show} transparent={true} >
                    <ImageViewer enableSwipeDown={true} onCancel={pressImageHandler} imageUrls={images} />
                </Modal>
            </TouchableOpacity>


            <FlatList
                data={examStateSectionInfo.questions}
                renderItem={({ item, index }) => {
                    return (
                        FlatListItem(item, index)
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
            >
            </FlatList>

            <TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Text style={{ textAlign: 'right', margin: 15, fontSize: 17, color: '#1570EF' }}>Next</Text>
                    <Image style={{}} source={require('../images/next.png')} />
                </View>
            </TouchableOpacity>

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // width: 100
        padding: 10,
        fontSize: 30
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    content: {
        backgroundColor: 'yellow'
    },
    question: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#007AFF',
        padding: 6,
        borderRadius: 5,
    }
});