import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: null,
    email: "",
    username: "",
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {}
})

export default profileSlice.reducer;