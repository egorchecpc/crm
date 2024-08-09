import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import '../../table.css'

const AdditionTable = () => {

    const columnDefs = [
        {headerName: "", field: "stage", flex:1,},
        {headerName: "Кредиты", field: "credit", flex:1,},
        {headerName: "Усл. обязательства", field: "contObligations", flex:1,},
    ];

    const rowData = [
        {stage: "По данным банка на 01.10.2023", credit: "", contObligations: ""},
    ];

    return (
        <div className="ag-theme-quartz" style={{width: 600, height: 300}}>
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

export default AdditionTable;
