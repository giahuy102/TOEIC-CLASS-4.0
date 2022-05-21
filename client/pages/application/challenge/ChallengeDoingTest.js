import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import data from '../../Ignored_Challenge/RESULT_DATA.json'
// import MultipleChoice from 'react-native-multiple-choice-picker'
import { RadioButton } from 'react-native-paper';


export default function ChallengeDoingTest({ navigation }) {

    // React.useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerLeft: () => {
    //             // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
    //             return (
    //                 <TouchableOpacity onPress={() => navigation.pop()}>
    //                     <Image source={require('../../../assets/back_arrow.png')} />

    //                 </TouchableOpacity>
    //             );

    //         },..........................
    //     });
    // }, [navigation]);

    // useEffect(() => {

    // })

    const [checked, setChecked] = useState('')

    const FlatListItem = (item, index) => {
        return (

            // <MultipleChoice />
            <View>

                <RadioButton
                    value="first"
                    status={checked === 'first' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('first')}
                />
                <RadioButton
                    value="second"
                    status={checked === 'second' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('second')}
                />

            </View>

        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.left}>
                    <Text>Icon</Text>
                </View>

                <View style={styles.right}>
                    <Text style={{ fontWeight: 'bold' }}>
                        Time left:  <Text style={{ fontWeight: 'normal' }}>59:01</Text>
                    </Text>
                </View>
            </View>

            <View style={styles.content}>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        // console.log(`item = ${JSON.stringify(item)}, index = ${index}`)
                        return (
                            FlatListItem(item, index)
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                >
                </FlatList>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // width: 100
        padding: 10
    },
    header: {
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    content: {
        backgroundColor: 'yellow'
    }
});