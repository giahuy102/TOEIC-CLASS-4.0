import { configureStore } from "@reduxjs/toolkit";

import profileSlice from '../pages/application/profile/slice/profileSlice';
import challengesListSlice from '../pages/application/challenge/slice/challengesListSlice';
import challengeRealTimeSlice from '../pages/application/challenge/slice/challengeRealTimeSlice';

const store = configureStore({
    reducer: {
        'profile': profileSlice,
        'challengesList': challengesListSlice,
        'challengeRealTime': challengeRealTimeSlice,
    }
});

export default store;