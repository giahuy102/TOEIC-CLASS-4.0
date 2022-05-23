import { Pressable, Text, StyleSheet, View, Image } from "react-native";
import AppStyles from "../../../styles/OnboardingScreen.scss";

export default function AboutUsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={AppStyles.OnboardingTextView}>
                <Image
                    style={AppStyles.OnboardingImage}
                    source={require('../../../assets/onboardingImage/Onboarding1.png')}
                />
                <Text style={AppStyles.OnboardingHeader}>{"Toeic 4.0"}</Text>
                <Text style={AppStyles.OnboardingText}>{"Version 0.0.1\nMobile App Team"}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});