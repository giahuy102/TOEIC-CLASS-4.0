import React, { useState } from 'react';

import { Button, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native';

import { TextInput } from "react-native-paper";

import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import ProfileService from '../../../services/ProfileService';

export default function UpdateAccount({ navigation, route }) {
	const userData = route.params;
	const [username, setUsername] = useState(userData.username);
	const [email, setEmail] = useState(userData.email);

	console.log("userData before update: ", userData);
	const oldEmail = userData.email;

	React.useLayoutEffect(() => {																			// cancel button
		navigation.setOptions({
			headerLeft: () => {
				return (
					<TouchableOpacity onPress={() => navigation.pop()}>
						<Image source={require('../../../assets/cross_cancel_delete.png')} />
					</TouchableOpacity>
				);

			},
		});
	}, [navigation]);

	const onPressHandler = (event) => {
		event.preventDefault();
		ProfileService.update(
			userData, username, email, oldEmail
		).then( res => {
			Alert.alert('Updated!', '', [
				{ text: 'OK', onPress: () => navigation.pop() }
			]);
			console.log("userData after update: ", userData);
		}).catch (err => {
			console.warn(err)
		})
		// Alert.alert('Updated!', '', [
		// 	{ text: 'OK', onPress: () => navigation.pop() }
		// ]);		
	}
	return (
		<View style={styles.container}>
			<View style={{ marginTop: 30 }}>
				<Text style={{ fontWeight: 'bold', fontSize: 20 }}>
					Username <Text style={{ color: 'red' }}>*</Text>
				</Text>
				<TextInput
					style={styles.input}
					placeholder={userData.username}
					onChangeText={text => setUsername(text)}
				/>
			</View>

			<View style={{ marginTop: 30 }}>
				<Text style={{ fontWeight: 'bold', fontSize: 20 }}>
					Email <Text style={{ color: 'red' }}>*</Text>
				</Text>
				<TextInput
					style={styles.input}
					keyboardType='email-address'
					placeholder={userData.email}
					onChangeText={text => setEmail(text)}
				/>
			</View>

			<View style={styles.button}>
				<Button
					borderRadius='10'
					color="#1570EF"
					title='Update'
					onPress={onPressHandler}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	picker: {
		width: 350,
		height: 50,
		borderColor: 'red',
		borderWidth: 4,
		backgroundColor: '#E4E7EC',
		borderRadius: 20,
		paddingLeft: 10,
	},
	input: {
		width: 350,
		backgroundColor: '#E4E7EC',
		height: 50,
		paddingLeft: 10,
		fontSize: 15,
	},
	button: {
		margin: 30,
		width: 350,
	}
});