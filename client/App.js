import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartScreen from './pages/StartScreen';
import Login from './pages/authenticate/Login';
import Signup from './pages/authenticate/Signup';

// import Homepage from './pages/Homepage';

import ClassMember from './pages/ClassMember';
import NewSection from './pages/NewSection';
import Exams from './pages/Exams';
import Sections from './pages/Sections';

import NewExam from "./pages/NewExam";
import NewQuestion from './pages/NewQuestion';

import Challenge from './pages/Challenge.js';

import ChallengeTest from './pages/ChallengeTest';
import ChallengeResult from './pages/ChallengeResult';
import Temp from './pages/Temp';
import ChallengeCreate from './pages/ChallengeCreate.js';

import OnboardingScreen1 from './pages/onboarding/OnboardingScreen1';
import OnboardingScreen2 from './pages/onboarding/OnboardingScreen2';
import OnboardingScreen3 from './pages/onboarding/OnboardingScreen3';

import ClassroomsStackScreen from './pages/application/ClassroomsStackScreen';

import { loadToken } from './services/JWTStorage'
import AuthService from './services/AuthService';

import AppStyles from './styles/SystemFontStyles.scss';

import { Provider as PaperProvider } from 'react-native-paper';


// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

// function DetailsScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//     </View>
//   );
// }

import TabSectionNavigator from './components/TabSectionNavigator';

const Stack = createNativeStackNavigator();


export default function App({ navigation }) {

  // const [startPage, setStartPage] = useState('StartScreen');
  // useEffect(() => {
  //   loadToken().then(value => {
  //     if (value) {
  //       AuthService.getUser(value)
  //       .then(response => {
  //         console.log(response.data);
  //       }).catch(err => {
  //         console.log(err);
  //       })
  //     }
  //   })
  // });bc
  const [username, setUsername] = useState('');
  // const test = () => console.log(2);
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='StartScreen'
          screenOptions={({ route, navigation }) => ({
            headerTitleAlign: 'center',
            headerTitleStyle: AppStyles.HeaderTitleStyle,
          })}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />


          <Stack.Screen name="Onboarding1" component={OnboardingScreen1} options={{ headerShown: false }} />
          <Stack.Screen name="Onboarding2" component={OnboardingScreen2} options={{ headerShown: false }} />
          <Stack.Screen name="Onboarding3" component={OnboardingScreen3} options={{ headerShown: false }} />


          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />


          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ClassroomsStackScreen" component={ClassroomsStackScreen} />
          </Stack.Group>







          {/* <Stack.Screen
            name="Homepage"
            component={Homepage}
            options={{ headerShown: false }}
          /> */}

          <Stack.Screen
            name="ClassMember"
            component={ClassMember}
            options={{ title: 'Class members' }}
          />

          <Stack.Screen
            name="NewSection"
            component={NewSection}
            options={{ title: 'New section' }}
          />

          <Stack.Screen
            name="Challenge"
            component={Challenge}
            options={{ title: 'Challenge' }}
          />

          <Stack.Screen
            name="ChallengeTest"
            component={ChallengeTest}
            options={{ title: 'Taking challenge test' }}
          />

          <Stack.Screen
            name="ChallengeResult"
            component={ChallengeResult}
            options={{ title: 'Result' }}
          />

          <Stack.Screen
            name="Temp"
            component={Temp}
            options={{ title: 'Temp' }}
          />

          <Stack.Screen
            name="ChallengeCreate"
            component={ChallengeCreate}
            options={{ title: 'Create new challenge' }}
          />

          <Stack.Screen
            name="NewExam"
            component={NewExam}
            options={{ title: 'Create new exam' }}
          />

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

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#1570EF',
    fontFamily: 'Roboto'
  }
});


// options={
//   // {headerBackImageSource: require('./assets/back_arrow.png')}
//   {headerLeft: () => <Image source={require('./assets/back_arrow.png') }  />}
// }
// title="Login"
// options={{headerTitleAlign: 'center'}}