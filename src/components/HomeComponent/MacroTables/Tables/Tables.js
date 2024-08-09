import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { updateMacroData } from '../../../../redux/macroDataSlice';
import s from './Tables.module.css';

const Tables = ({ data, type }) => {
    const dispatch = useDispatch();
    const [rowData, setRowData] = useState([]);

    // UseEffect to update rowData when data changes
    useEffect(() => {
        const newRowData = [
            {
                scenario: "Значение",
                ...data.reduce((acc, item, index) => ({
                    ...acc,
                    [`worst${index}`]: item.worst.value,
                    [`normal${index}`]: item.normal.value,
                    [`best${index}`]: item.best.value,
                }), {})
            },
            {
                scenario: "Вероятность",
                ...data.reduce((acc, item, index) => ({
                    ...acc,
                    [`worst${index}`]: item.worst.change,
                    [`normal${index}`]: item.normal.change,
                    [`best${index}`]: item.best.change,
                }), {})
            },
        ];
        setRowData(newRowData);
    }, [data]);  // <- Dependency on `data`

    const columnDefs = [
        { headerName: "Сценарий", field: "scenario", headerClass: s.headerCell, width: 120 },
        ...data.map((item, index) => ({
            headerName: item.year.toString(),
            children: [
                {
                    headerName: "Худш.",
                    field: `worst${index}`,
                    cellClass: s.bad,
                    headerClass: s.bad,
                    width: 80,
                    editable: true
                },
                { headerName: "Норм", field: `normal${index}`, cellClass: s.normal, width: 80, editable: true },
                {
                    headerName: "Лучш.",
                    field: `best${index}`,
                    cellClass: s.good,
                    headerClass: s.good,
                    width: 80,
                    editable: true
                }
            ]
        }))
    ];

    const handleCellValueChanged = (params) => {
        const { colDef, newValue, rowIndex } = params;
        const updatedRowData = [...rowData];

        if (rowIndex === 0) { // строка "Значение"
            updatedRowData[0][colDef.field] = isNaN(parseFloat(newValue)) ? 0 : parseFloat(newValue);
        } else if (rowIndex === 1) { // строка "Вероятность"
            updatedRowData[1][colDef.field] = isNaN(parseFloat(newValue)) ? 0 : parseFloat(newValue);
        }

        setRowData(updatedRowData);
    };

    const handleSave = () => {
        const updatedData = data.map((item, index) => ({
            ...item,
            worst: {
                value: parseFloat(rowData[0][`worst${index}`]),
                change: parseFloat(rowData[1][`worst${index}`]),
            },
            normal: {
                value: parseFloat(rowData[0][`normal${index}`]),
                change: parseFloat(rowData[1][`normal${index}`]),
            },
            best: {
                value: parseFloat(rowData[0][`best${index}`]),
                change: parseFloat(rowData[1][`best${index}`]),
            },
        }));

        console.log(updatedData);
        dispatch(updateMacroData({ type, updatedData }));
    };

    const nameChanger = {
        realIncome: 'РРДН',
        workProgress: 'ННЗП'
    }

    return (
        <div className={`${s['ag-theme-no-borders']} ${s.customGrid} ${s['ag-theme-alpine']}`}
             style={{height: '300px', width: '100%', borderRadius: '10px', overflow: 'hidden'}}>
            <h3>{nameChanger[type]}</h3>
            <button onClick={handleSave}>Загрузить</button>
            <AgGridReact
                columnDefs={columnDefs.map(colDef => {
                    if (colDef.children) {
                        colDef.children = colDef.children.map(childDef => ({
                            ...childDef,
                            valueFormatter: childDef.field.includes('worst') || childDef.field.includes('normal') || childDef.field.includes('best') ? (params => params.value) : undefined
                        }));
                    }
                    return colDef;
                })}
                rowData={rowData}
                domLayout='autoHeight'
                headerHeight={40}
                rowHeight={40}
                onCellValueChanged={handleCellValueChanged}
                suppressHorizontalScroll={true}
                suppressMovableColumns={true}
            />
        </div>
    );
};

export default Tables;
