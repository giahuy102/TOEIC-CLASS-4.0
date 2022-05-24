import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from "react-native-paper";
import axios from 'axios'
import Profile from './Profile';
import { useDispatch } from 'react-redux';
import { updateProfileState } from './slice/profileSlice';

const BASE_API_URL = `http://10.0.2.2:${3001}`;
const PROFILE_PREFIX = '/api/profile';

export default function UpdateAccount({ navigation, route }) {
	const userData = route.params;
	const [newUsername, setNewUsername] = useState('');
	const [newEmail, setNewEmail] = useState('');
	const oldEmail = userData.email
	const dispatch = useDispatch()

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

	const onPressHandler = async () => {
		// console.log("old email: ", oldEmail)
		// console.log("new username: ", newUsername)
		// console.log("new email: ", newEmail)


		const newAccountData = { newUsername, newEmail, oldEmail }
		await axios.put(BASE_API_URL + PROFILE_PREFIX + '/update_account', newAccountData)
			.then(res => {
				const updateAccount = res.data
				dispatch(updateProfileState(updateAccount))
				console.log("update account successfully")
			})
			.catch(err => {
				console.log("Error update account: ", err)
			})

		Alert.alert('Updated!', '', [
			{ text: 'OK', onPress: () => navigation.pop() }
		]);
	}

	return (
		<View style={styles.container}>
			<View style={{ marginTop: 30 }}>
				<Text style={{ fontWeight: 'bold', fontSize: 20 }}>
					Username <Text style={{ color: 'red' }}>*</Text>
				</Text>
				<TextInput
					style={styles.input}
					onChangeText={setNewUsername}
				/>
			</View>

			<View style={{ marginTop: 30 }}>
				<Text style={{ fontWeight: 'bold', fontSize: 20 }}>
					Email <Text style={{ color: 'red' }}>*</Text>
				</Text>
				<TextInput
					style={styles.input}
					keyboardType='email-address'
					onChangeText={setNewEmail}
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