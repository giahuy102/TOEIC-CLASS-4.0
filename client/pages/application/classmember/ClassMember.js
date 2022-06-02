import React, { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthService from '../../../services/AuthService';
import ClassroomService from "../../../services/ClassroomService";
import { storeToken } from '../../../services/JWTStorage';

function compareRankingChartItemByAverageScore(a, b) {
    if (a.average_score < b.average_score) {
        return 1; /** Above 0 number means must swap */
    } else if (a.average_score > b.average_score) {
        return -1;
    }
    return 0;
}

export default function Login({ navigation, route }) {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [borderColor, setBorderColor] = useState();
    const [memberList, setMemberList] = useState([]);

    const routeParams = route.params;
    const { classId } = routeParams;

    useEffect(async () => {
        const fetchClassroomDetailInfo = async () => {
            const getClassroomDetailInfoResponse = await ClassroomService.getClassroomDetailInfo(classId);
            const getClassroomDetailInfoData = getClassroomDetailInfoResponse.data;
            const newMemberList = [...getClassroomDetailInfoData['students_list']];
            console.log('newMemberList', newMemberList);
            setMemberList(newMemberList.sort(compareRankingChartItemByAverageScore));
        };
        await fetchClassroomDetailInfo();
    }, []);

    const renderItem = ({ item }) => (
        // <Text>{item.rank}</Text>
        <View style={styles.member}>
            <View style={styles.left}>
                <View style={styles.name}>
                    <Text style={styles.name_text}>
                        {item.username[0]}
                    </Text>

                </View>
            </View>

            <View style={styles.right}>
                <Text>{item.username}</Text>
                <View
                    style={
                        {
                            flexDirection: 'row'
                        }
                    }
                >
                    <View
                        style={
                            {
                                flexDirection: 'row',
                                alignItems: 'center'
                            }
                        }
                    >
                        <Image
                            source={require('../../../assets/user_role_icon.png')}
                        />
                        <Text style={styles.sub_content}>{item.role}</Text>
                    </View>

                    <View
                        style={
                            {
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: 25
                            }
                        }
                    >
                        <Image
                            source={require('../../../assets/rank_member_icon.png')}
                        />
                        <Text style={styles.sub_content}>{item.average_score.toFixed(2)}</Text>
                    </View>
                </View>

            </View>

        </View>
    );

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
    return (
        <View style={styles.container}>
            {/* <View style={styles.member}>
                <View style={styles.left}>
                    <View style={styles.name}>
                        <Text style={styles.name_text}>
                            T
                        </Text>

                    </View>
                </View>
                
                <View style={styles.right}>
                    <Text>Geno David</Text>
                    <View
                        style={
                            {
                                flexDirection: 'row'
                            }
                        }
                    >
                        <View
                            style={
                                {
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }
                            }
                        >
                            <Image 
                                source={require('../assets/user_role_icon.png')}
                            />
                            <Text style={styles.sub_content}>Admin</Text>
                        </View>
                    
                        <View
                            style={
                                {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginLeft: 25
                                }
                            }
                        >
                            <Image 
                                source={require('../assets/rank_member_icon.png')}
                            />
                            <Text style={styles.sub_content}>0</Text>
                        </View>
                    </View>

                </View>

            </View> */}
            <FlatList
                // style={styles.container}
                data={memberList}
                renderItem={renderItem}
                keyExtractor={item => item._id}
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
        // paddingLeft: '5%',
        // paddingRight: '5%'
    },

    name: {
        width: '80%',
        aspectRatio: 1,
        backgroundColor: '#98E3A8',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },


    member: {
        width: '94%',
        aspectRatio: 3.5,
        // borderWidth: 1,
        // borderColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: 'white',
        marginLeft: '3%',
        marginRight: '3%'
    },

    name_text: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white'
    },

    right: {
        justifyContent: 'space-around',
        flex: 1,
        height: '85%',
        marginLeft: 7
    },

    left: {
        height: '100%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    sub_content: {
        marginLeft: 5
    }
});