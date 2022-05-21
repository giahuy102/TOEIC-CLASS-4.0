import { configureStore } from "@reduxjs/toolkit";

import profileSlice from '../pages/application/profile/slice/profileSlice';
import challengesListSlice from '../pages/application/challenge/slice/challengesListSlice';

const store = configureStore({
    reducer: {
        'profile': profileSlice,
        'challengesList': challengesListSlice,
    }
});

export default store;