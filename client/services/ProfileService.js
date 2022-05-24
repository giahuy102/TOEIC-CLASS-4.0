import axios from "axios";

const API_URL = "http://10.0.2.2:3001/api/profile/";

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