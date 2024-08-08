import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    columns: [],
    rows: [],
    mappedData: [],
    fieldMappings: {},
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setColumns(state, action) {
            state.columns = action.payload;
        },
        setRows(state, action) {
            state.rows = action.payload;
        },
        setMappedData(state, action) {
            state.mappedData = action.payload;
        },
        setFieldMappings(state, action) {
            state.fieldMappings = action.payload;
        },
    },
});

export const { setColumns, setRows, setMappedData, setFieldMappings } = dataSlice.actions;

export default dataSlice.reducer;
