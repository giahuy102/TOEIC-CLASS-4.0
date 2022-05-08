import React, { useState } from 'react';

import { Button, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native';

import { TextInput } from "react-native-paper";

import DateTimePicker from '@react-native-community/datetimepicker';

import AppStyles from '../../styles/SystemFontStyles.scss';

export default function ChangeInformation ({ navigation }) {
    const [showCalendar, setShowCalendar] = useState(false);
    const [date, setDate] = useState(new Date());
    const [maxDate, setMaxDate] = useState(new Date());
	React.useLayoutEffect(() => {																			// cancel button
		navigation.setOptions({
			headerLeft: () => {
				return (
					<TouchableOpacity onPress={() => navigation.pop()}>
						<Image source={require('../../assets/cross_cancel_delete.png')} />
					</TouchableOpacity>
				);

			},
		});
	}, [navigation]);

    const showDatePicker = () => {
        setShowCalendar(true);
        setMaxDate(new Date());
    }
    const onChangeDate = (event, selectedValue) => {
        setShowCalendar(false);
        if (selectedValue)
            setDate(selectedValue);
    }
    const onCancel = () => {
        setShowCalendar(false);
    }
	const onPressHandler = () => {
		Alert.alert('Saved!', '', [
			{ text: 'OK', onPress: () => navigation.pop() }
		]);
	}

	return (
		<View style={styles.container}>
			<View style={{ marginTop: 30 }}>
				<Text style={{ fontWeight: 'bold', fontSize: 20 }}>
					Fullname <Text style={{ color: 'red' }}>*</Text>
				</Text>
				<TextInput
					style={styles.input}
				/>
			</View>

			<View style={{ marginTop: 30 }}>
				<Text style={{ fontWeight: 'bold', fontSize: 20 }}>
					Birthdate <Text style={{ color: 'red' }}>*</Text>
				</Text>
				<TextInput
					style={styles.input}
                    disabled={true}
                    right={<TextInput.Icon name='calendar' onPress={() => showDatePicker()}/>}
                    value={date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()}
				/>
                {showCalendar && (<DateTimePicker
                    testID='datePicker'
                    value={date}
                    maximumDate={maxDate}
                    mode='date'
                    display='default'
                    onChange={onChangeDate}
                    onTouchCancel={onCancel}
                >
                </DateTimePicker>)}
			</View>

			<View style={styles.button}>
				<Button
					borderRadius='10'
					color="#1570EF"
					title='Save'
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