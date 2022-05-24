import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

export default function Profile({ navigation, route }) {
	const email = useSelector(state => state.profile.email);
	const username = useSelector(state => state.profile.username);
	const userData = {
		email: email,
		username: username,
	}
	console.log("user: ", userData);

	return (
		<View style={styles.container}>
			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: '4%', marginBottom: '-4%', width: '90%' }}>
				<Text style={{ fontWeight: 'bold', fontSize: 22 }}>
					{"Account information"}
				</Text>
				<TouchableOpacity onPress={() => navigation.navigate('UpdateAccount', userData)}>
					<Image source={require('../../../assets/edit.png')} />
				</TouchableOpacity>
			</View>

			<View style={{ flex: 1, flexDirection: 'row', marginTop: '-14%', width: '80%' }}>
				<View style={styles.left}>
					<Image source={require('../../../assets/account_circle.png')} />
				</View>
				<View style={styles.right}>
					<Text style={{ fontWeight: 'bold', fontSize: 16 }}>
						{"User name"}
					</Text>
					<Text>
						{username}
					</Text>
				</View>
			</View>

			<View style={{ flex: 1, flexDirection: 'row', marginTop: '-14%', width: '80%' }}>
				<View style={styles.left}>
					<Image source={require('../../../assets/email.png')} />
				</View>
				<View style={styles.right}>
					<Text style={{ fontWeight: 'bold', fontSize: 16 }}>
						{"Email"}
					</Text>
					<Text>
						{email}
					</Text>
				</View>
			</View>

			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: '-14%', marginBottom: '-4%', width: '90%' }}>
				<Text style={{ fontWeight: 'bold', fontSize: 22 }}>
					{"Personal information"}
				</Text>
				<TouchableOpacity onPress={() => navigation.navigate('ChangeInformation', userData)}>
					<Image source={require('../../../assets/edit.png')} />
				</TouchableOpacity>
			</View>

			<View style={{ flex: 1, flexDirection: 'row', marginTop: '-14%', width: '80%' }}>
				<View style={styles.left}>
					<Image source={require('../../../assets/account_circle.png')} />
				</View>
				<View style={styles.right}>
					<Text style={{ fontWeight: 'bold', fontSize: 16 }}>
						{"Full name"}
					</Text>
					<Text>
						{username}
					</Text>
				</View>
			</View>

			<View style={{ flex: 1, flexDirection: 'row', marginTop: '-14%', width: '80%' }}>
				<View style={styles.left}>
					<Image source={require('../../../assets/cake_candles.png')} />
				</View>
				<View style={styles.right}>
					<Text style={{ fontWeight: 'bold', fontSize: 16 }}>
						{"Birthdate"}
					</Text>
					<Text>
						{"10/10/2001"}
					</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		width: '100%'
	},

	right: {
		flex: 1,
		marginLeft: 20
	},

	left: {
		//flex: 1,

	}
});