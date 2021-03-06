import react, { useState } from "react"
import { Pressable, Text, StyleSheet, View, Image } from "react-native";
import AppStyles from "../../styles/OnboardingScreen.scss";

export default OnboardingScreen3 = ({ navigation }) => {

    const proceedToLoginPage = () => {
        navigation.popToTop();
        navigation.replace("Login");
    }

    return (
        <View style={styles.container}>
            <View style={AppStyles.OnboaringUpperButtonView}>
            </View>
            <View style={AppStyles.OnboardingTextView}>
                <Image
                    style={AppStyles.OnboardingImage}
                    source={require('../../assets/onboardingImage/Onboarding3.png')}
                />
                <Text style={AppStyles.OnboardingHeader}>{"Push Each Other \nTo The Limit"}</Text>
                <Text style={AppStyles.OnboardingText}>{"Challenge your classmate in real-time contest with random test to practice what you have learnt. "}</Text>
            </View>
            <View style={AppStyles.OnboaringBelowButtonView}>
                <Pressable
                    style={AppStyles.OnboardingButton}
                    onPress={() => navigation.navigate('Onboarding2')}
                >
                    <Text style={AppStyles.OnboardingButtonText}>Back</Text>
                </Pressable>
                <Pressable
                    style={AppStyles.OnboardingButton}
                    onPress={() => proceedToLoginPage()}
                >
                    <Text style={AppStyles.OnboardingButtonText}>Login</Text>
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