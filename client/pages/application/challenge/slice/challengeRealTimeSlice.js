import { createAsyncThunk, createSelector, createEntityAdapter, createSlice, useSelector, current } from "@reduxjs/toolkit";

const challengeRealTimeAdapter = createEntityAdapter();

const initialState = challengeRealTimeAdapter.getInitialState({
    status: 'disconnected',
    challenge_id: null,
    chatSocketId: null,
    socketOwnerId: null,
    rankingChart: [],
    examState: [],
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
        },
        endingChallengeRealTimeEvent(state, action) {
            const { ChallengeModelItem, ChallengeEventsRecordModelQuery } = action.payload;
            state.rankingChart = ChallengeEventsRecordModelQuery.rankingChart;
        },
        updateRankingChartFromServerData(state, action) {
            const { ChallengeEventsRecordModelQuery } = action.payload;
            state.rankingChart = ChallengeEventsRecordModelQuery.rankingChart
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
                state.challenge_id = action.payload.challenge_id
            })
            .addCase(initiateChallengeRealTimeSocket.rejected, (error) => {

            })

            .addCase(destroyChallengeRealTimeSocket.fulfilled, (state, action) => {
                state.status = "disconnected";
                state.chatSocketId = null;
                state.socketOwnerId = null;
            })
    }
})

export const { initChallengeRealTimeSlice, addNewUserParticipateChallenge, updateRankingChartFromServerData, endingChallengeRealTimeEvent } = challengeRealTimeSlice.actions;

export default challengeRealTimeSlice.reducer;

export const initiateChallengeRealTimeSocket = createAsyncThunk('challengeRealTime/initiateChallengeRealTimeSocket', async (socket, thunkAPI) => {
    const { user_id, challenge_id } = socket.socket.auth;
    try {
        /**
         * After socket.connect(), server will also emit:
         * socket.emit('initChallengeRealTimeSliceDataEmitted', { newChallengeParticipationModel, ChallengeEventsRecordModelQuery })
         * and the rankingChart and examState Redux State has been modified, triggering rerender in ChallengeRealTimeStackScreen.js
         */
        await socket.connect();
        // console.log('challengeRealTimeSlice initiateChallengeRealTimeSocket');
        return { chatSocketId: socket.id, socketOwnerId: user_id, challenge_id };
    }
    catch (error) {
        // console.log('initiateChallengeRealTimeSocket Thunk rejected Error', error);
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

export const initiateEventListeners = createAsyncThunk('challengeRealTime/initiateEventListeners', async ({ socket, navigation }, thunkAPI) => {
    // console.log("challengeRealTimeSlice: Initiate Event Listener thunk called");

    /**
     * An example
     */
    await socket.on("an event", (data) => {
        // console.log("client receive an event, info", data);
        /**
         * thunkAPI.dispatch(updateNewMessage(data));
         */
    })

    await socket.on("initChallengeRealTimeSliceDataEmitted", (data) => {
        // console.log("initChallengeRealTimeSliceDataEmitted event data", data);
        const { newChallengeParticipationModel, ChallengeEventsRecordModelQuery } = data;
        thunkAPI.dispatch(initChallengeRealTimeSlice({ newChallengeParticipationModel, ChallengeEventsRecordModelQuery }))
    })

    await socket.on("newUserParticipateChallenge", (data) => {
        // console.log("newUserParticipateChallenge event data", data);
        const { user_id, score } = data;
        thunkAPI.dispatch(addNewUserParticipateChallenge({ user_id, score }));
    })

    await socket.on("endingChallengeRealTimeEvent", (data) => {
        const { ChallengeModelItem, ChallengeEventsRecordModelQuery } = data;
        /**                             
         * Move user to ChallengeResult Screen
         */
        thunkAPI.dispatch(endingChallengeRealTimeEvent({ ChallengeModelItem, ChallengeEventsRecordModelQuery }));
        /**
         * Actually must dispatch somehow with an CommonAction (with previous history state) to fully reset
         * the history to erase the ChallengeRealTimeStackScreen StackNavigator out of history tree but still keep
         * the Stack Navigator parent that one level above it (which is ClassoomChallengesStackScreen)
         */
        navigation.navigate('ChallengeResult', { rankingChart: ChallengeEventsRecordModelQuery.rankingChart });
    })

    await socket.on('serverEmitBackChallengeEventsRecordModelDataToClientForUpdate', (data) => {
        const { ChallengeEventsRecordModelQuery } = data;
        thunkAPI.dispatch(updateRankingChartFromServerData({ ChallengeEventsRecordModelQuery }));
    })
})

export const destroyChallengeRealTimeSocket = createAsyncThunk('challengeRealTime/destroyChallengeRealTimeSocket', async (socket, thunkAPI) => {
    // console.log("challengeRealTimeSlice: destroyChallengeRealTimeSocket Thunk socket.socket", socket.socket);
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



export const socketEmitUserChooseAnAnswerEvent = createAsyncThunk('challengeRealTime/socketEmitUserChooseAnAnswerEvent', async ({ socket, user_id, sectionIndex, questionIndex, theAnswer, isAnswerCorrected, challenge_id }, thunkAPI) => {
    try {
        // console.log("socketEmitUserChooseAnAnswerEvent Thunk prepare to emit 'userChooseAnAnswer' event", {
        //     user_id,
        //     sectionIndex,
        //     questionIndex,
        //     theAnswer,
        //     isAnswerCorrected,
        //     challenge_id
        // });
        await socket.emit('userChooseAnAnswer', {
            user_id,
            sectionIndex,
            questionIndex,
            theAnswer,
            isAnswerCorrected,
            challenge_id
        })
    } catch (err) {
        console.log('challengeRealTimeSlice.js: socketEmitUserChooseAnAnswerEvent Socket emit error', err);
    }
})













