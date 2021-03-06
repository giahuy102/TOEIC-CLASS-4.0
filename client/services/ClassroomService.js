import axios from "axios";

import Constants from 'expo-constants';

const NAH_API_URL = Constants.manifest.extra.API_URL;

const API_URL = `${NAH_API_URL}/api/classroom`;

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