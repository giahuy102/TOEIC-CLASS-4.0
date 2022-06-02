import axios from "axios";

import Constants from 'expo-constants';

const NAH_API_URL = Constants.manifest.extra.API_URL;


const API_URL = `${NAH_API_URL}/api/profile/`;

const ProfileService = function () {
    this.update = (username, email, oldEmail) => {
        console.log("Profile service -> update: ", username, email, oldEmail);
        return axios.post(API_URL + 'update', {
            username,
            email,
            oldEmail
        });
    }

    this.change = (user, fullname, birthday) => {
        console.log("Profile service -> change: ", user, fullname, birthday);
        return axios.post(API_URL + 'change', {
            user,
            fullname,
            birthday
        })
    }
}

export default new ProfileService();