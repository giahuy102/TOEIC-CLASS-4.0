import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    'classroom': {
        'id': '',
        'classname': '',
        'number_student': '',
        'level': '',
        'start_date': '',
        'end_date': '',
        'password': '',
    },
    'students_list': []
}

const classroomDetailSlice = createSlice({
    name: 'classroomDetail',
    initialState,
    reducers: {}
})

export default classroomDetailSlice;