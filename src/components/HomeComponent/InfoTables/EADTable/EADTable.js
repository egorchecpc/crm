import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import '../table.css'

const EADTable = () => {
    const columnDefs = [
        { headerName: "", field: "stage", flex:1,},
        { headerName: "Оборот по дебету", field: "debitTurnover", flex:1,},
        { headerName: "CCF", field: "ccf", flex:1,},
    ];

    const rowData = [
        { stage: "Стадия 1", debitTurnover: "", ccf: "" },
        { stage: "Стадия 2", debitTurnover: "", ccf: "" },
        { stage: "Стадия 3", debitTurnover: "", ccf: "" },
        { stage: "POCI", debitTurnover: "", ccf: "" },
    ];

    return (
        <div className="ag-theme-quartz" style={{ width: 600, height: 300 }}>
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

export default EADTable;
