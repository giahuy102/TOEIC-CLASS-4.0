// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    }
    catch (err) {
        // console.log(1);
        console.log(err);
    }
};

export const loadToken = async () => {
    try {
        const value = await AsyncStorage.getItem('jwt-token');
        if (value !== null) {
            // We have data!!
            return value;
        }
        return null;
    } catch (error) {
        // Error retrieving data
        console.log(error);
    }
}

export const removeKey = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch (err) {
        console.log(err);
    }
};


export const storeEmail = async (email) => {
    try {
        await AsyncStorage.setItem("email", email);
    }
    catch (err) {
        // console.log(1);
        console.log(err);
    }
};


export const loadEmail = async () => {
    try {
        const value = await AsyncStorage.getItem('email');
        if (value !== null) {
            // We have data!!
            // console.log("LOADED EMAIL: ", value)
            return value;
        }
        return null;
    } catch (error) {
        // Error retrieving data
        console.log(error);
    }
}


// export const getToken = () => {
//     const promise = loadToken();
//     let token = null;
//     promise.then(value => {
//         token = value;
//     })
// }

// export default { storeToken };