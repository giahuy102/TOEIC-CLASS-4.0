import axios from "axios";
const API_URL = "http://192.168.1.37:3001/api/test/";

const TestService = function () {
    this.getTestDetailById = (test_id) => {
        return axios.get(`${API_URL}/${test_id}/detail`);
    }
}

export default new TestService();