import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';
import data from './Participate.json';

export default function ResultAll({ navigation, route }) {

	const class_id = route.params["class_id"]
	const type = route.params["type"]
	// console.log("in result page: ", class_id)
	// console.log("in result page, type: ", type)

	React.useLayoutEffect(() => {																			// return button
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

	useEffect(async () => {
		console.log("class_id: ", class_id)
		console.log("type: ", type)
    }, [])

	const FlatListItem = (item, index) => {
		return (
			<TouchableOpacity style={styles.member} onPress={() => navigation.navigate('DetailResult')}>
				<View style={styles.left}>
					<View style={{
						width: '80%',
						aspectRatio: 1,
						backgroundColor: index % 3 == 0 ? '#96ECEC' : (index % 3 == 1 ? '#98E3A8' : '#B98DDC'),
						borderRadius: 10,
						justifyContent: 'center',
						alignItems: 'center'
					}}>
						<Text style={styles.name_text}>
							T
						</Text>
					</View>
				</View>

				<View style={styles.right}>
					<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: '-2%' }}>
						<Text>{item.challenge.name}</Text>
					</View>

					<Text style={{ paddingTop: 10 }}>ID: {item.user.key}</Text>
					<Text>End: {item.challenge.end}</Text>
				</View>

				<View style={styles.left}>
					<View style={{
						width: '80%',
						aspectRatio: 1,
						backgroundColor: '#1570EF',
						borderRadius: 10,
						justifyContent: 'center',
						alignItems: 'center'
					}}>
						<Text style={styles.name_text}>
							{item.score}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				renderItem={({ item, index }) => {
					if (item.user.key == 1910402) {					// filter the id --> remember to handle 
						return (
							FlatListItem(item, index)
						);
					}
				}}
			>
			</FlatList>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		// justifyContent: 'center'
		// width: 100
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
		width: '97%',
		aspectRatio: 3.5,
		borderWidth: 0,
		borderColor: 'black',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 15,
		backgroundColor: 'white',
		paddingRight: 10
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
	},

	touchableOpacity: {
		position: 'absolute',
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		right: 30,
		bottom: 30,
	},
	floatingButton: {
		resizeMode: 'contain',
		width: 50,
		height: 50,
	}
});