import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: null,
    email: "",
    username: "",
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateProfileState(state, action) {
            const { _id, email, username } = action.payload;
            state._id = _id;
            state.email = email;
            state.username = username;
        }
    }
})

export const { updateProfileState } = profileSlice.actions;

export default profileSlice.reducer;