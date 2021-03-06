import React, { useState, useEffect } from 'react';
import { Provider } from "react-redux";
import store from './global/store';

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartScreen from './pages/StartScreen';
import Login from './pages/authenticate/Login';
import Signup from './pages/authenticate/Signup';

// import Temp from './pages/application/challenge/ChallengeScreen';

import ChallengeCreate from './pages/application/challenge/ChallengeCreate.js';
import ChallengeResult from "./pages/application/challenge/ChallengeResult";
import ChallengeTest from "./pages/application/challenge/ChallengeTest";
import Challenge from './pages/application/challenge/Challenge';
import ChallengeScreen from './pages/application/challenge/ChallengeScreen';

import MainTabScreen from './pages/application/MainTabScreen';
import ClassroomDetailScreen from './pages/application/classrooms/ClassroomDetailScreen';

import OnboardingScreen1 from './pages/onboarding/OnboardingScreen1';
import OnboardingScreen2 from './pages/onboarding/OnboardingScreen2';
import OnboardingScreen3 from './pages/onboarding/OnboardingScreen3';

import ApplicationStackScreen from './pages/application/ApplicationStackScreen';

import AppStyles from './styles/SystemFontStyles.scss';
import { Provider as PaperProvider } from 'react-native-paper';

import TabSectionNavigator from './components/TabSectionNavigator';
import ChallengeUpcoming from './pages/application/challenge/ChallengeUpcoming';
import ChallengeChallenging from './pages/application/challenge/ChallengeChallenging';

import Constants from 'expo-constants';

const API_URL = Constants.manifest.extra.API_URL;

console.log('[App.js] API_URL', Constants.manifest.extra.API_URL);

const Stack = createNativeStackNavigator();


export default function App({ navigation }) {
  const [username, setUsername] = useState('');
  return (
    <Provider store={store}>
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
              <Stack.Screen name="ApplicationStackScreen" component={ApplicationStackScreen} />
            </Stack.Group>

            {/* <Stack.Screen
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
            name="ChallengeScreen"
            component={ChallengeScreen}
            options={{ title: 'Challenge' }}
          />

          <Stack.Screen
            name="ChallengeCreate"
            component={ChallengeCreate}
            options={{ title: 'Create new challenge' }}
          />

          <Stack.Screen
            name="ChallengeChallenging"
            component={ChallengeChallenging}
            options={{ title: 'ChallengeChallenging' }}
          /> */}

            <Stack.Screen
              name="ClassroomDetailScreen"
              component={ClassroomDetailScreen}
              options={{ title: 'MainTabScreen' }}
            />

            <Stack.Screen
              name="MainTabScreen"
              component={MainTabScreen}
              options={{ title: 'MainTabScreen' }}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
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