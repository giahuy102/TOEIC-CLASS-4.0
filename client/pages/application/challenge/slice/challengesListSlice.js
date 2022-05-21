import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    upcomingChallengesList: [],
    challengingChallengesList: [],
    endedChallengesList: [],
}

const challengesListSlice = createSlice({
    name: 'challengesList',
    initialState,
    reducers: {
        loadChallengingChallengesList(state, action) {
            const newChallengingChallengesList = action.payload;
            state.challengingChallengesList = newChallengingChallengesList;
        },
        loadUpcomingChallengesList(state, action) {
            const newUpcomingChallengesList = action.payload;
            state.upcomingChallengesList = newUpcomingChallengesList;
        },
        loadEndedChallengesList(state, action) {
            const newEndedChallengesList = action.payload;
            state.endedChallengesList = newEndedChallengesList;
        },
        addNewChallenge(state, action) {
            const newChallenge = action.payload;
            if (newChallenge.status === 0) {
                state.challengingChallengesList.push(newChallengingChallenge);
            } else if (newChallenge.status === 1) {
                state.upcomingChallengesList.push(newUpcomingChallenge);
            } else if (newChallenge.status === 2) {
                state.endedChallengesList.push(newEndedChallenge);
            }
        },
    }
})

export const {
    loadChallengingChallengesList,
    addNewChallengingChallenge,
    loadUpcomingChallengesList,
    addNewUpcomingChallenge,
    loadEndedChallengesList,
    addNewEndedChallenge
}
    = challengesListSlice.actions;

export default challengesListSlice.reducer;