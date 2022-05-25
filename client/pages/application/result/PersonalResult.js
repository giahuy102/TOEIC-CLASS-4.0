import React, { useState } from 'react';

import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ResultAll from './ResultAll';
import ResultMonth from './ResultMonth';
import ResultWeek from './ResultWeek'


const Tab = createMaterialTopTabNavigator();

export default function YourResult({ navigation, route }) {


	const class_id = route.params
	console.log("in personal result, class id: ", class_id)

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => {
				return (
					<TouchableOpacity onPress={() => navigation.pop()}>
						<Image source={require('../../../assets/back_arrow.png')} />
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
			<Tab.Screen name="All" component={ResultAll} initialParams={{ class_id, 'type': 'all' }} options={{ title: "All" }} />
			<Tab.Screen name="Month" component={ResultMonth} initialParams={{ class_id, 'type': 'month' }} options={{ title: "Month" }} />
			<Tab.Screen name="Week" component={ResultWeek} initialParams={{ class_id, 'type': 'week' }} options={{ title: "Week" }} />
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