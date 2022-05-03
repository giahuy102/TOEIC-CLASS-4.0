import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeOnboardingToken = async () => {
    try {
        await AsyncStorage.setItem("isApplicationVisited", true)
    } catch (err) {
        console.log("Error when set item isVisitedOnce", err);
    }
}

export const isApplicationVisited = async () => {
    try {
        const isVisitedOnce = await AsyncStorage.getItem("isApplicationVisited")
        return isVisitedOnce === true;
    } catch (err) {
        console.log("Error when get item isVisitedOnce", err);
    }
}