import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';


export default function Profile({ navigation, route }) {
	const { username } = route.params;

	return (
		<View style={styles.container}>
			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: '4%', marginBottom: '-4%', width: '90%' }}>
				<Text style={{ fontWeight: 'bold', fontSize: 22 }}>
					{"Account information"}
				</Text>
				<TouchableOpacity onPress={() => navigation.navigate('UpdateAccount')}>
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
						{"minhnhan"}
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
						{"myemail@gmail.com"}
					</Text>
				</View>
			</View>

			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: '-14%', marginBottom: '-4%', width: '90%' }}>
				<Text style={{ fontWeight: 'bold', fontSize: 22 }}>
					{"Personal information"}
				</Text>
				<TouchableOpacity onPress={() => navigation.navigate('ChangeInformation')}>
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
						{"Le Ngoc Minh Nhan"}
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
						{"21/07/2001"}
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