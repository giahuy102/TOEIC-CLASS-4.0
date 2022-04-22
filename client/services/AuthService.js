import axios from 'axios';
import { ActionSheetIOS } from 'react-native';
const API_URL = "http://192.168.0.104:3001/api/user/";

// import { useNavigate } from "react-router-dom";

const AuthService = function() {
    // let navigate = useNavigate();
    this.register = (username, email, password) => {
        return axios.post(API_URL + 'register', {
            username,
            email,
            password
        });
    }

    this.login = (email, password) => {
        return axios.post(API_URL + 'login', {
            email,
            password
        })
    }

    this.getUser = (token) => {
        return axios.post(API_URL + 'get_user', {
            token
        })
    }
}

export default new AuthService();