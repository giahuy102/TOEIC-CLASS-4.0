import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ClassroomDetailScreen from "./classrooms/ClassroomDetailScreen";
import ClassroomChallengesStackScreen from "./challenge/ClassroomChallengesStackScreen";
import MainTabScreen from "./MainTabScreen";
import AboutUsScreen from "./more/AboutUsScreen";
import MonthlyRecordsListScreen from "./monthly/MonthlyRecordsListScreen";
import MonthlyRecordDetailScreen from "./monthly/MonthlyRecordDetailScreen";
import ClassMember from "./classmember/ClassMember";
import Result from './result/Result.js'
import YourResult from './result/YourResult.js';
import DetailResult from './result/DetailResult.js';
import Profile from './profile/Profile.js';
import UpdateAccount from './profile/UpdateAccount.js';
import ChangeInformation from './profile/ChangeInformation.js';

import Exams from './exam/Exams';
import NewExam from './exam/NewExam';
import NewQuestion from './exam/NewQuestion';
import Sections from './exam/Sections';
import NewSection from './exam/NewSection';

import AppStyles from "../../styles/SystemFontStyles.scss";

const Stack = createNativeStackNavigator();

export default function ApplicationStackScreen({ navigation, route }) {
    return (
        <Stack.Navigator initialRouteName="MainTabScreen"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: AppStyles.HeaderTitleStyle,
            }}
        >
            <Stack.Group>
                <Stack.Screen name="ClassroomDetailScreen" component={ClassroomDetailScreen} />
                <Stack.Screen name="MainTabScreen" component={MainTabScreen} options={{
                    headerBackStyle: { display: 'None' },
                    title: "Toeic E-Class 4.0"
                }} />
            </Stack.Group>

            <Stack.Group>
                <Stack.Screen name="ClassroomChallengesStackScreen" component={ClassroomChallengesStackScreen} options={{
                    headerShown: false
                }} />
            </Stack.Group>

            <Stack.Group>
                <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} options={{
                    title: "About Us"
                }} />
            </Stack.Group>

            <Stack.Group>
                <Stack.Screen name="MonthlyRecordsListScreen" component={MonthlyRecordsListScreen} options={{
                    title: "Monthly Record"
                }} />
                <Stack.Screen name="MonthlyRecordDetailScreen" component={MonthlyRecordDetailScreen} />
            </Stack.Group>

            <Stack.Group>
                <Stack.Screen
                    name="ClassMember"
                    component={ClassMember}
                    options={{ title: 'Class members' }}
                />
            </Stack.Group>

            <Stack.Group>
                <Stack.Screen
                    name="Result"
                    component={Result}
                    options={{ title: 'Result' }}
                />

                <Stack.Screen
                    name="YourResult"
                    component={YourResult}
                    options={{ title: 'Result' }}
                />

                <Stack.Screen
                    name="DetailResult"
                    component={DetailResult}
                    options={{ title: 'Detailed Result' }}
                />
            </Stack.Group>

            <Stack.Group>
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{ title: 'Profile' }}
                />

                <Stack.Screen
                    name="UpdateAccount"
                    component={UpdateAccount}
                    options={{ title: 'Update Account' }}
                />

                <Stack.Screen
                    name="ChangeInformation"
                    component={ChangeInformation}
                    options={{ title: 'Change Information' }}
                />
            </Stack.Group>

            <Stack.Group>
                <Stack.Screen
                    name="Exams"
                    component={Exams}
                    options={{ title: 'Exams' }}
                />

                <Stack.Screen
                    name="Sections"
                    component={Sections}
                    options={{ title: 'Sections' }}
                />

                <Stack.Screen
                    name="NewQuestion"
                    component={NewQuestion}
                    options={{ title: 'New question' }}
                />

                <Stack.Screen
                    name="NewExam"
                    component={NewExam}
                    options={{ title: 'Create new exam' }}
                />

                <Stack.Screen
                    name="NewSection"
                    component={NewSection}
                    options={{ title: 'New section' }}
                />

            </Stack.Group>
        </Stack.Navigator>
    )
}
