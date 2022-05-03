import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { NavigationContainer } from '@react-navigation/native';

import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';


import SectionImageTitle from './SectionImageTitle';

import SectionText from './SectionText'

const Tab = createMaterialTopTabNavigator();

export default function TabSectionNavigator() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Image" component={SectionImageTitle} />
        <Tab.Screen name="Text" component={SectionText} />
      </Tab.Navigator>

  );
}