import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import '../table.css'


const LGDTable = () => {
    const columnDefs = [
        {
            headerName: "",
            children: [
                {
                    headerName: "",
                    field: "note",
                    cellClass: '',
                    suppressMovable: true,
                    flex:1,
                },
                {
                    headerName: "1-ая и 2-ая стадия",
                    flex:1,
                    field: 'stage1-2'
                },
                {
                    headerName: "3-яя стадия",
                    field: "stage3",
                    flex:1,
                    children: [
                        {headerName: "X < 1 года", field: "xlt1", flex:1,},
                        {headerName: "1 года < X < 2 лет", field: "x12", flex:1,},
                        {headerName: "2 лет < X < 3 лет", field: "x23", flex:1,},
                        {headerName: "X > 3 лет", field: "xgt3", flex:1,},
                    ]
                }
            ]
        },
    ];

    const rowData = [
        {
            rowIndex: 0,
            note: "Нахождение в дефолте \"X\" год",
            xlt1: "",
            x12: "",
            x23: "",
            xgt3: "",
            stage3: ""
        },
        {
            rowIndex: 1,
            note: "RR",
            xlt1: "",
            x12: "",
            x23: "",
            xgt3: "",
            stage3: ""
        },
        {
            rowIndex: 2,
            note: "LGD",
            xlt1: "",
            x12: "",
            x23: "",
            xgt3: "",
            stage3: ""
        },
        {
            rowIndex: 3,
            'stage1-2': "Вероятность выздоровления 1000",
            stage3: 'Макрофактор для Стадии 3 1000'
        },
    ];

    return (
        <div className="ag-theme-quartz" style={{width: '100%', height: 400}}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                suppressRowTransform={true}
                defaultColDef={{
                    resizable: true,
                    sortable: true,
                }}
            />
        </div>
    );
};

export default LGDTable;
