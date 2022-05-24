import * as React from 'react';
import { View, Text, Pressable } from 'react-native';

import AppStyles from '../../../../styles/ChallengeWaitingScreen.scss';

export default function ChallengeWaitingScreen({ navigation, route }) {
    return (
        <View style={AppStyles.ChallengeWaitingScreenContainer}>
            <Pressable
                style={AppStyles.ChallengeWaitingScreenStartTestButton}
                onPress={() => { navigation.navigate('ChallengeDoingSection0') }}
            >
                <Text style={AppStyles.ChallengeWaitingScreenStartTestButtonText}>Proceed To First Section</Text>
            </Pressable>
        </View>
    );
}