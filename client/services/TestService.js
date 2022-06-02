import axios from "axios";
import Constants from 'expo-constants';

const NAH_API_URL = Constants.manifest.extra.API_URL;

const API_URL = `${NAH_API_URL}/api/test/`;

const TestService = function () {
    this.getTestDetailById = (test_id) => {
        return axios.get(`${API_URL}/${test_id}/detail`);
    }
}

export default new TestService();