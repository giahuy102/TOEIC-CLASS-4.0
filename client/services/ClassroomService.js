import axios from "axios";
const API_URL = 'http://10.0.2.2:3001/api/classroom';

const ClassroomService = function () {
    this.createClassroom = (createClassroomPayload) => {
        return axios.post(`${API_URL}/create`, createClassroomPayload)
    }

    this.getAllClassrooms = () => {
        return axios.get(`${API_URL}/all`);
    }

    this.getClassroomDetailInfo = (classId) => {
        return axios.get(`${API_URL}/${classId}/get_basic_info_all_member`)
    }
}

export default new ClassroomService();