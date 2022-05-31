import axios from "axios";
const API_URL = "http://10.0.2.2:3001/api/test/";

const TestService = function () {
    this.getTestDetailById = (test_id) => {
        return axios.get(`${API_URL}/${test_id}/detail`);
    }
}

export default new TestService();