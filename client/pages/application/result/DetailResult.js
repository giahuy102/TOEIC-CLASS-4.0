import React, { useState } from 'react';

import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, TouchableHighlight, FlatList } from 'react-native';

import data from './Participate.json'


export default function DetailResult ({ navigation }) {

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
					Challenge: {data[0].challenge.name} 
				</Text>
				<Text style={{ fontSize: 20, fontWeight: 'normal' }}>
					ID: {data[0].user.key}
				</Text>
				<Text style={{ fontSize: 20, fontWeight: 'normal' }}>
					Started: {data[0].challenge.create_at}
				</Text>
				<Text style={{ fontSize: 20, fontWeight: 'normal' }}>
					End: {data[0].challenge.end_at}
				</Text>
			</View>

			<View style={{ marginTop: 40, width: '25%' }}>
				<Text style={{ fontSize: 22, fontWeight: 'normal' }}>
					--------------
				</Text>
			</View>

			<View style={{ marginTop: 20, padding: 15, width: '95%' }}>
				<Text style={{ fontSize: 20, fontWeight: 'normal' }}>
					Started on: {data[0].challenge.start}
				</Text>
				<Text style={{ fontSize: 20, fontWeight: 'normal' }}>
					Completed on: {data[0].challenge.end}
				</Text>
				<Text style={{ fontSize: 20, fontWeight: 'normal' }}>
					Taken: {} minutes
				</Text>
				<Text style={{ fontSize: 20, fontWeight: 'normal' }}>
					Correct answer: {data[0].correct_answer}/{data[0].challenge.test.length}
				</Text>
				<Text style={{ fontSize: 20, fontWeight: 'normal' }}>
					Grade: {data[0].score}
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