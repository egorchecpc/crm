import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import '../table.css'


const PDTable = () => {
    const columnDefs = [
        { headerName: 'Дни', field: 'days', width: 100, pinned: 'left' }, // Добавлен столбец для дней
        { headerName: '2023 12m', children: [
                { headerName: 'PD TTC', field: 'pdTTC' },
                { headerName: 'PD PIT без макро', field: 'pdPIT' }
            ]
        },
        { headerName: '2024', children: [
                { headerName: 'PD PIT с макро', field: 'pdPitMacro' }
            ]
        },
        { headerName: 'Для стадии 1', children: [
                { headerName: 'I кв', field: 'stage1Q1' },
                { headerName: 'II кв', field: 'stage1Q2' },
                { headerName: 'III кв', field: 'stage1Q3' },
                { headerName: 'IV кв', field: 'stage1Q4' }
            ]
        },
        { headerName: 'Для стадии 2', children: [
                { headerName: 'I кв', field: 'stage2Q1' },
                { headerName: 'II кв', field: 'stage2Q2' },
                { headerName: 'III кв', field: 'stage2Q3' },
                { headerName: 'IV кв', field: 'stage2Q4' }
            ]
        }
    ];

    const rowData = [
        { days: '0', category: 'cPD', pdTTC: '', pdPIT: '', pdPitMacro: '', stage1Q1: '', stage1Q2: '', stage1Q3: '', stage1Q4: '', stage2Q1: '', stage2Q2: '', stage2Q3: '', stage2Q4: '' },
        { days: '0-30', category: 'cPD', pdTTC: '', pdPIT: '', pdPitMacro: '', stage1Q1: '', stage1Q2: '', stage1Q3: '', stage1Q4: '', stage2Q1: '', stage2Q2: '', stage2Q3: '', stage2Q4: '' },
        { days: '30-60', category: 'cPD', pdTTC: '', pdPIT: '', pdPitMacro: '', stage1Q1: '', stage1Q2: '', stage1Q3: '', stage1Q4: '', stage2Q1: '', stage2Q2: '', stage2Q3: '', stage2Q4: '' },
        { days: '60-90', category: 'cPD', pdTTC: '', pdPIT: '', pdPitMacro: '', stage1Q1: '', stage1Q2: '', stage1Q3: '', stage1Q4: '', stage2Q1: '', stage2Q2: '', stage2Q3: '', stage2Q4: '' },
        { days: '0', category: 'mPD', pdTTC: '', pdPIT: '', pdPitMacro: '', stage1Q1: '', stage1Q2: '', stage1Q3: '', stage1Q4: '', stage2Q1: '', stage2Q2: '', stage2Q3: '', stage2Q4: '' },
        { days: '0-30', category: 'mPD', pdTTC: '', pdPIT: '', pdPitMacro: '', stage1Q1: '', stage1Q2: '', stage1Q3: '', stage1Q4: '', stage2Q1: '', stage2Q2: '', stage2Q3: '', stage2Q4: '' },
        { days: '30-60', category: 'mPD', pdTTC: '', pdPIT: '', pdPitMacro: '', stage1Q1: '', stage1Q2: '', stage1Q3: '', stage1Q4: '', stage2Q1: '', stage2Q2: '', stage2Q3: '', stage2Q4: '' },
        { days: '60-90', category: 'mPD', pdTTC: '', pdPIT: '', pdPitMacro: '', stage1Q1: '', stage1Q2: '', stage1Q3: '', stage1Q4: '', stage2Q1: '', stage2Q2: '', stage2Q3: '', stage2Q4: '' }
    ];

    return (
        <div className="ag-theme-quartz" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{ resizable: true, sortable: true }}
                groupDisplayType="groupRows"
            />
        </div>
    );
};

export default PDTable;
