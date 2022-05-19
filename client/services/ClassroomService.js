import axios from "axios";
const API_URL = 'http://10.0.2.2:3001/api/classroom';

const ClassroomService = function () {
    this.createClassroom = (createClassroomPayload) => {
        return axios.post(`${API_URL}/create`, createClassroomPayload)
    }

    this.getAllClassrooms = (loadTokenResponse) => {
        return axios.post(`${API_URL}/all`, {
            token: loadTokenResponse
        });
    }

    this.getClassroomDetailInfo = (classId) => {
        return axios.get(`${API_URL}/${classId}/get_basic_info_all_member`)
    }

    this.joinClassroomRequest = (password, classId, loadTokenResponse) => {
        return axios.post(`${API_URL}/join`, {
            token: loadTokenResponse,
            classId: classId,
            password: password,
        })
    }
}

export default new ClassroomService();