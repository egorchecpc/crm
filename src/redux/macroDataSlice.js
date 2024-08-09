import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
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
                item.type === type ? { ...item, data: updatedData } : item
            );
        },
        addMacroData(state, action) {
            const { type, newData } = action.payload;
            const existingType = state.data.find(item => item.type === type);
            if (existingType) {
                existingType.data.push(newData);
            } else {
                state.data.push({
                    type,
                    data: [newData],
                });
            }
        },
    },
});

export const { setMacroData, updateMacroData, addMacroData } = macroDataSlice.actions;

export default macroDataSlice.reducer;
