import { createAsyncThunk, createSelector, createEntityAdapter, createSlice, useSelector, current } from "@reduxjs/toolkit";
import axios from "axios";

const ServerURI = '';

const challengeRealTimeAdapter = createEntityAdapter();

const initialState = challengeRealTimeAdapter.getInitialState({
    status: 'disconnected',
    chatSocketId: null,
    socketOwnerId: null,
    socketSessionId: null,
    rankingChart: [],
    examState: [],
    currentSections: null,
    challengeTimeStart: null,
    challengeTimeEnd: null,
    challengeCurrentTime: null
})

/**
 *      SLICE REDUCER
 */

const challengeRealTimeSlice = createSlice({
    name: 'challengeRealTime',
    initialState,
    reducers: {
        initChallengeRealTimeSlice(state, action) {
            const { newChallengeParticipationModel, ChallengeEventsRecordModelQuery } = action.payload;
            state.examState = newChallengeParticipationModel.examState;
            state.rankingChart = ChallengeEventsRecordModelQuery.rankingChart;
        },
        addNewUserParticipateChallenge(state, action) {
            const { user_id, score } = action.payload;
            let newRankingChart = state.rankingChart;
            newRankingChart.push({ user_id, score });
            newRankingChart.sort((user1, user2) => user1.score - user2.score);
            state.rankingChart = newRankingChart;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(initiateChallengeRealTimeSocket.pending, (state, action) => {
                state.status = "connecting"
            })
            .addCase(initiateChallengeRealTimeSocket.fulfilled, (state, action) => {
                state.status = "connected";
                state.chatSocketId = action.payload.chatSocketId;
                state.socketOwnerId = action.payload.socketOwnerId;
                state.socketSessionId = action.payload.socketSessionId;
            })
            .addCase(initiateChallengeRealTimeSocket.rejected, (error) => {

            })

            .addCase(destroyChallengeRealTimeSocket.fulfilled, (state, action) => {
                state.status = "disconnected";
                state.chatSocketId = null;
                state.socketOwnerId = null;
                state.socketSessionId = null;
            })
    }
})

export const { initChallengeRealTimeSlice, addNewUserParticipateChallenge } = challengeRealTimeSlice.actions;

export default challengeRealTimeSlice.reducer;

export const initiateChallengeRealTimeSocket = createAsyncThunk('challengeRealTime/initiateChallengeRealTimeSocket', async (socket, thunkAPI) => {
    const { uniqueSessionId, userId } = socket.socket.auth;
    try {
        await socket.connect();
        console.log('challengeRealTimeSlice initiateChallengeRealTimeSocket');
        return { chatSocketId: socket.id, socketOwnerId: userId, socketSessionId: uniqueSessionId };
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

/**
 * The initiate event listener for the socket socket.on("event", ...)
 * must be initated even before connect to server socket.connect()
 * Since if register listener only after client event socket.on("connect")
 * means the events emitted from server in the first connection will be ignored
 * because no event listener registered yet, the client socket have just connected 
 */

export const initiateEventListeners = createAsyncThunk('challengeRealTime/initiateEventListeners', async (socket, thunkAPI) => {
    console.log("challengeRealTimeSlice: Initiate Event Listener thunk called");

    /**
     * An example
     */
    await socket.on("an event", (data) => {
        console.log("client receive an event, info", data);
        /**
         * thunkAPI.dispatch(updateNewMessage(data));
         */
    })

    await socket.on("initChallengeRealTimeSliceDataEmitted", (data) => {
        console.log("initChallengeRealTimeSliceDataEmitted event data", data);
        const { newChallengeParticipationModel, ChallengeEventsRecordModelQuery } = data;
        thunkAPI.dispatch(initChallengeRealTimeSlice({ newChallengeParticipationModel, ChallengeEventsRecordModelQuery }))
    })

    await socket.on("newUserParticipateChallenge", (data) => {
        console.log("newUserParticipateChallenge event data", data);
        const { user_id, score } = data;
        thunkAPI.dispatch(addNewUserParticipateChallenge({ user_id, score }));
    })
})

export const destroyChallengeRealTimeSocket = createAsyncThunk('challengeRealTime/destroyChallengeRealTimeSocket', async (socket, thunkAPI) => {
    console.log("challengeRealTimeSlice: destroyChallengeRealTimeSocket Thunk socket.socket", socket.socket);
    if (!socket.socket.connected) {
        return thunkAPI.rejectWithValue({ message: 'Socket has disconnected already' });
    } else {
        try {
            await socket.disconnect();
            return {};
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
})

















