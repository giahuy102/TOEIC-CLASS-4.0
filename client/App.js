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

import Temp from './pages/application/challenge/Temp';
import Challenge from './pages/application/challenge/Challenge.js';
import ChallengeTest from './pages/application/challenge/ChallengeTest';
import ChallengeResult from './pages/application/challenge/ChallengeResult';
import ChallengeCreate from './pages/application/challenge/ChallengeCreate.js';

import OnboardingScreen1 from './pages/onboarding/OnboardingScreen1';
import OnboardingScreen2 from './pages/onboarding/OnboardingScreen2';
import OnboardingScreen3 from './pages/onboarding/OnboardingScreen3';

import ClassroomsStackScreen from './pages/application/ClassroomsStackScreen';

import AppStyles from './styles/SystemFontStyles.scss';
import { Provider as PaperProvider } from 'react-native-paper';

import TabSectionNavigator from './components/TabSectionNavigator';

const Stack = createNativeStackNavigator();


export default function App({ navigation }) {
  const [username, setUsername] = useState('');
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