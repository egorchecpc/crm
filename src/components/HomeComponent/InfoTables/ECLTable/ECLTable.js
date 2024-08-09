import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import AdditionTable from "./AdditionTable/AdditionTable";
import '../table.css'

const ECLTable = () => {

    const columnDefs = [
        {headerName: "", field: "stage", flex:1,},
        {headerName: "Остаток задолженности", field: "outBalance", flex:1,},
        {headerName: "По данным банка", field: "bankInfo", flex:1,},
        {headerName: 'Процент резирвирования', field: 'reservRate', flex:1,},
    ];

    const rowData = [
        {stage: "Стадия 1", outBalance: "", bankInfo: "", reservRate: ""},
        {stage: "Стадия 2", outBalance: "", bankInfo: "", reservRate: ""},
        {stage: "Стадия 3", outBalance: "", bankInfo: "", reservRate: ""},
        {stage: "Усл обязательства", outBalance: "", bankInfo: "", reservRate: ""},
    ];

    return (
        <div className="ag-theme-quartz" style={{width: 600, height: 300}}>
            <AdditionTable />
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef={{
                    resizable: true,
                    sortable: true,
                }}
            />
        </div>
    );
};

export default ECLTable;
