// src/TableComponent.js
import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './TableComponent.css'; // Импортируем стили

const TableComponent = () => {
    import {createSlice} from '@reduxjs/toolkit';

    const initialState = {
        data: [],
    };


    const test = [
        {
            type: 'test type 1',
            data: [
                {
                    id: 1,
                    year: 2003,
                    best: {value:23, change:23},
                    normal: {value:23, change:23},
                    worst: {value:23, change:23},
                },
                {
                    id: 2,
                    year: 2004,
                    best: {value:33, change:23},
                    normal: {value:23, change:23},
                    worst: {value:23, change:23},
                },
            ]
        },
        {
            type: 'test type 2',
            data: [
                {
                    id: 1,
                    year: 2003,
                    best: {value:23, change:23},
                    normal: {value:23, change:23},
                    worst: {value:23, change:23},
                },
                {
                    id: 2,
                    year: 2004,
                    best: {value:33, change:23},
                    normal: {value:23, change:23},
                    worst: {value:23, change:23},
                },
            ]
        }
    ]


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

    const columnDefs = [
        { headerName: '2025', children: [
                { headerName: 'Норм', field: 'norm1' },
                { headerName: 'Души', field: 'dushi1' }
            ]},
        { headerName: '2025', children: [
                { headerName: 'Норм', field: 'norm2' },
                { headerName: 'Души', field: 'dushi2' }
            ]},
        { headerName: '2025', children: [
                { headerName: 'Норм', field: 'norm3' },
                { headerName: 'Души', field: 'dushi3' }
            ]}
    ];

    const rowData = [
        { norm1: 100, dushi1: '50%', norm2: 100, dushi2: '50%', norm3: 100, dushi3: '50%' },
        { norm1: 100, dushi1: '10%', norm2: 100, dushi2: '10%', norm3: 100, dushi3: '10%' }
    ];

    return (
        <div className="ag-theme-alpine custom-grid" style={{ height: 400, width: 600 }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                headerHeight={50}
                rowHeight={50}
            />
        </div>
    );
};

export default TableComponent;
