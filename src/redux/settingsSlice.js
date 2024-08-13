import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    settings: {
        debtorType: '—',
        creditType: '—',
        productType: '—',
        selectedDate: null,
    },
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setFindSettings(state, action) {
            state.settings = action.payload;
        },
    },
});

export const {setFindSettings} = settingsSlice.actions;

export default settingsSlice.reducer;
