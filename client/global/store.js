import { configureStore } from "@reduxjs/toolkit";

import profileSlice from '../pages/application/profile/slice/profileSlice';

const store = configureStore({
    reducer: {
        'profile': profileSlice,
    }
});

export default store;