import react, { useState } from "react"
import { Button, Text, StyleSheet, View, Image } from "react-native";
import AppStyles from "../../styles/SystemFontStyles.scss";

export default OnboardingScreen2 = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={AppStyles.OnboaringUpperButtonView}>
                <View>
                </View>
                <Button
                    title="Skip"
                    style={AppStyles.OnboardingButton}
                    onPress={() => navigation.navigate('Onboarding3')}
                />
            </View>
            <View style={AppStyles.OnboardingTextView}>
                <Image
                    style={AppStyles.OnboardingImage}
                    source={require('../../assets/onboardingImage/Onboarding2.png')}
                />
                <Text style={AppStyles.OnboardingHeader}>{"On-Screen\nExamination"}</Text>
                <Text style={AppStyles.OnboardingText}>{"Multiple choice or text form with plugin image and audio options for convenient exam carrying. "}</Text>
            </View>
            <View style={AppStyles.OnboaringBelowButtonView}>
                <Button
                    title="Back"
                    style={AppStyles.OnboardingButton}
                    onPress={() => navigation.navigate('Onboarding1')}
                />
                <Button
                    title="Next"
                    style={AppStyles.OnboardingButton}
                    onPress={() => navigation.navigate('Onboarding3')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});