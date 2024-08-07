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
        updateMacroData(state, action) {
            const { type, updatedData } = action.payload;
            state.data = state.data.map(item =>
                item.type === type ? { ...item, ...updatedData } : item
            );
        },
    },
});

export const {setMacroData, updateMacroData} = macroDataSlice.actions;

export default macroDataSlice.reducer;
