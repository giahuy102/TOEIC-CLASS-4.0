import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    resultList: [],
}

const resultListSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
        loadResultList(state, action) {
            const newResultList = action.payload;
            state.resultList = newResultList;
        },
    }
})

export const { loadResultList } = resultListSlice.actions;

export default resultListSlice.reducer;