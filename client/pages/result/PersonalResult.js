import React, { useState } from 'react';

import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Result from './Result';

const Tab = createMaterialTopTabNavigator();

export default function YourResult ({ navigation, route }) {

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => {
				return (
					<TouchableOpacity onPress={() => navigation.pop()}>
						<Image source={require('../../assets/back_arrow.png')} />
					</TouchableOpacity>
				);

			},
		});
	}, [navigation]);


	return (

		<Tab.Navigator
			initialRouteName='Home'
			screenOptions={{
				tabBarInactiveTintColor: '#98A2B3',
				tabBarActiveTintColor: '#1570EF',
				headerTitleStyle: {
					fontWeight: 'bold',
				},
			}}
		>            
			<Tab.Screen name="ClassroomsListScreen" component={Result} options={{ title: "All" }} />
			<Tab.Screen name="Profile" component={Result} options={{ title: "Month" }} />
			<Tab.Screen name="MoreSettingsScreen" component={Result} options={{ title: "Week" }} />
		</Tab.Navigator>

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