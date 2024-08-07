import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    data: []
};

const macroDataSlice = createSlice({
    name: 'macroData',
    initialState,
    reducers: {
        setMacroData(state, action) {
            state.data = action.payload;
        },
    },
});

export const {setMacroData} = macroDataSlice.actions;

export default macroDataSlice.reducer;
