import react, { useState } from "react"
import { Pressable, Text, StyleSheet, View, Image } from "react-native";
import AppStyles from "../../styles/SystemFontStyles.scss";

console.log("SystemFontStyles", AppStyles);

export default OnboardingScreen1 = ({ navigation }) => {
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
                    source={require('../../assets/onboardingImage/Onboarding1.png')}
                />
                <Text style={AppStyles.OnboardingHeader}>{"Classroom In\nYour Pocket"}</Text>
                <Text style={AppStyles.OnboardingText}>{"Connect with your teacher and classmate, attend classroom on the go"}</Text>
            </View>
            <View style={AppStyles.OnboaringBelowButtonView}>
                <View></View>
                <Pressable
                    style={[AppStyles.OnboardingButton]}
                    onPress={() => navigation.navigate('Onboarding2')}
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