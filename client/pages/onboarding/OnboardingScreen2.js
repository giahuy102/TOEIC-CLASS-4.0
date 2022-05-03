import react, { useState } from "react"
import { Pressable, Text, StyleSheet, View, Image } from "react-native";
import AppStyles from "../../styles/SystemFontStyles.scss";

export default OnboardingScreen2 = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={AppStyles.OnboaringUpperButtonView}>
                <View>
                </View>
                <Pressable
                    style={AppStyles.OnboardingButton}
                    onPress={() => navigation.navigate('Onboarding3')}
                >
                    <Text style={AppStyles.OnboardingButtonText}>Skip</Text>
                </Pressable>
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
                <Pressable
                    style={AppStyles.OnboardingButton}
                    onPress={() => navigation.navigate('Onboarding1')}
                >
                    <Text style={AppStyles.OnboardingButtonText}>Back</Text>
                </Pressable>
                <Pressable
                    style={AppStyles.OnboardingButton}
                    onPress={() => navigation.navigate('Onboarding3')}
                >
                    <Text style={AppStyles.OnboardingButtonText}>Next</Text>
                </Pressable>
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