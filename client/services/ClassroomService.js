import axios from "axios";
const API_URL = 'http://10.0.2.2:3001/api/classroom';

const ClassroomService = function () {
    this.createClassroom = (createClassroomPayload) => {
        return axios.post(`${API_URL}/create`, createClassroomPayload)
    }
}

export default new ClassroomService();