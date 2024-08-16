import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import '../table.css'


const PDTable = () => {
    const columnDefs = [
        {
            headerName: "", field: "stage", flex: 1, children: [
                {headerName: '', field: 'days', width: 100, pinned: 'left'},
                {headerName: '', field: 'category', pinned: 'left', flex: 1},
                {
                    headerName: '2023 12m', children: [
                        {headerName: 'PD TTC', field: 'pdTTC'},
                    ]
                },
                {
                    headerName: '2023 12m', children: [
                        {headerName: 'PD PIT без макро', field: 'pdPIT'}
                    ]
                },
            ]
        },
        {
            headerName: 'Для стадии 1', field: 'stage', flex: 1, children: [
                {
                    headerName: '2024', children: [
                        {headerName: 'PD PIT с макро', field: 'pdPitMacro'}
                    ]
                },
            ]
        },

        {
            headerName: 'Для стадии 2', children: [
                {
                    headerName: '2025', field: 'year', flex: 1, children: [
                        {headerName: 'I кв', field: 'stage1Q1'},
                        {headerName: 'II кв', field: 'stage1Q2'},
                        {headerName: 'III кв', field: 'stage1Q3'},
                        {headerName: 'IV кв', field: 'stage1Q4'}
                    ]
                },
                {
                    headerName: '2026', field: 'year', flex: 1, children: [
                        {headerName: 'I кв', field: 'stage1Q1'},
                        {headerName: 'II кв', field: 'stage1Q2'},
                        {headerName: 'III кв', field: 'stage1Q3'},
                        {headerName: 'IV кв', field: 'stage1Q4'}
                    ]
                },
                {
                    headerName: '2027', field: 'year', flex: 1, children: [
                        {headerName: 'I кв', field: 'stage1Q1'},
                        {headerName: 'II кв', field: 'stage1Q2'},
                        {headerName: 'III кв', field: 'stage1Q3'},
                        {headerName: 'IV кв', field: 'stage1Q4'}
                    ]
                },
            ]
        },
    ];

    const rowData = [
        {
            days: '0',
            category: 'cPD',
            pdTTC: '',
            pdPIT: '',
            pdPitMacro: '',
            stage1Q1: '',
            stage1Q2: '',
            stage1Q3: '',
            stage1Q4: '',
            stage2Q1: '',
            stage2Q2: '',
            stage2Q3: '',
            stage2Q4: ''
        },
        {
            days: '0-30',
            category: 'cPD',
            pdTTC: '',
            pdPIT: '',
            pdPitMacro: '',
            stage1Q1: '',
            stage1Q2: '',
            stage1Q3: '',
            stage1Q4: '',
            stage2Q1: '',
            stage2Q2: '',
            stage2Q3: '',
            stage2Q4: ''
        },
        {
            days: '30-60',
            category: 'cPD',
            pdTTC: '',
            pdPIT: '',
            pdPitMacro: '',
            stage1Q1: '',
            stage1Q2: '',
            stage1Q3: '',
            stage1Q4: '',
            stage2Q1: '',
            stage2Q2: '',
            stage2Q3: '',
            stage2Q4: ''
        },
        {
            days: '60-90',
            category: 'cPD',
            pdTTC: '',
            pdPIT: '',
            pdPitMacro: '',
            stage1Q1: '',
            stage1Q2: '',
            stage1Q3: '',
            stage1Q4: '',
            stage2Q1: '',
            stage2Q2: '',
            stage2Q3: '',
            stage2Q4: ''
        },
        {
            days: '0',
            category: 'mPD',
            pdTTC: '',
            pdPIT: '',
            pdPitMacro: '',
            stage1Q1: '',
            stage1Q2: '',
            stage1Q3: '',
            stage1Q4: '',
            stage2Q1: '',
            stage2Q2: '',
            stage2Q3: '',
            stage2Q4: ''
        },
        {
            days: '0-30',
            category: 'mPD',
            pdTTC: '',
            pdPIT: '',
            pdPitMacro: '',
            stage1Q1: '',
            stage1Q2: '',
            stage1Q3: '',
            stage1Q4: '',
            stage2Q1: '',
            stage2Q2: '',
            stage2Q3: '',
            stage2Q4: ''
        },
        {
            days: '30-60',
            category: 'mPD',
            pdTTC: '',
            pdPIT: '',
            pdPitMacro: '',
            stage1Q1: '',
            stage1Q2: '',
            stage1Q3: '',
            stage1Q4: '',
            stage2Q1: '',
            stage2Q2: '',
            stage2Q3: '',
            stage2Q4: ''
        },
        {
            days: '60-90',
            category: 'mPD',
            pdTTC: '',
            pdPIT: '',
            pdPitMacro: '',
            stage1Q1: '',
            stage1Q2: '',
            stage1Q3: '',
            stage1Q4: '',
            stage2Q1: '',
            stage2Q2: '',
            stage2Q3: '',
            stage2Q4: ''
        }
    ];

    return (
        <div className="ag-theme-quartz" style={{height: 400, width: '100%'}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{resizable: true, sortable: true}}
                groupDisplayType="groupRows"
            />
        </div>
    );
};

export default PDTable;
