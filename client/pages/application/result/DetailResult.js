import React, { useState } from 'react';

import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, TouchableHighlight, FlatList } from 'react-native';

import data from './Participate.json'


export default function DetailResult({ navigation, route }) {

	const { item: data } = route.params;

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
		<View style={styles.container}>
			<View style={{ marginTop: 20, padding: 15, width: '95%' }}>
				<Text style={{ fontSize: 20, fontWeight: 'bold' }}>
					Challenge: {data.challenge.title}
				</Text>
				<Text style={{ fontSize: 20, fontWeight: 'normal' }}>
					ID: {data.challenge._id}
				</Text>
				<Text style={{ fontSize: 20, fontWeight: 'normal' }}>
					Started: {data.challenge.start}
				</Text>
				<Text style={{ fontSize: 20, fontWeight: 'normal' }}>
					End: {data.challenge.end}
				</Text>
			</View>

			<View style={{ marginTop: 40, width: '25%' }}>
				<Text style={{ fontSize: 22, fontWeight: 'normal' }}>
					--------------
				</Text>
			</View>

			<View style={{ marginTop: 20, padding: 15, width: '95%' }}>
				{/* <Text style={{ fontSize: 20, fontWeight: 'normal' }}>
					Correct answer: {data.score.toFixed(2)}
				</Text> */}
				<Text style={{ fontSize: 20, fontWeight: 'normal' }}>
					Grade: {data.score.toFixed(2)}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
});