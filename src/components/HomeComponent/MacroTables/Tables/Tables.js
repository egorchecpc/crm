    import React, { useState } from 'react';
    import { useDispatch } from 'react-redux';
    import { AgGridReact } from 'ag-grid-react';
    import 'ag-grid-community/styles/ag-grid.css';
    import 'ag-grid-community/styles/ag-theme-alpine.css';
    import { updateMacroData } from '../../../../redux/macroDataSlice';
    import s from './Tables.module.css';

    const Tables = ({ data, type }) => {
        const dispatch = useDispatch();
        const [rowData, setRowData] = useState([
            {
                scenario: "Значение",
                ...data.reduce((acc, item, index) => ({
                    ...acc,
                    [`worst${index}`]: item.worst.value,
                    [`normal${index}`]: item.normal.value,
                    [`best${index}`]: item.best.value
                }), {})
            },
            {
                scenario: "Вероятность",
                ...data.reduce((acc, item, index) => ({
                    ...acc,
                    [`worst${index}`]: `${item.worst.chance}%`,
                    [`normal${index}`]: `${item.normal.chance}%`,
                    [`best${index}`]: `${item.best.chance}%`
                }), {})
            },
        ]);

        const columnDefs = [
            { headerName: "Сценарий", field: "scenario", headerClass: s.headerCell, width: 120 },
            ...data.map((item, index) => ({
                headerName: item.year.toString(),
                children: [
                    { headerName: "Худш.", field: `worst${index}`, cellClass: s.bad, headerClass: s.bad, width: 80, editable: true },
                    { headerName: "Норм", field: `normal${index}`, cellClass: s.normal, width: 80, editable: true },
                    { headerName: "Лучш.", field: `best${index}`, cellClass: s.good, headerClass: s.good, width: 80, editable: true }
                ]
            }))
        ];

        const valueFormatter = params => {
            return isNaN(params.value) ? params.value : params.value;
        };

        const handleCellValueChanged = (params) => {
            const { colDef, newValue, rowIndex } = params;
            const updatedRowData = [...rowData];
            if (rowIndex === 0) { // строка "Значение"
                updatedRowData[0][colDef.field] = newValue;
            } else if (rowIndex === 1) { // строка "Вероятность"
                updatedRowData[1][colDef.field] = newValue;
            }

            setRowData(updatedRowData);
        };

        const handleSave = () => {
            const updatedData = data.map((item, index) => ({
                ...item,
                worst: {
                    value: parseFloat(rowData[0][`worst${index}`]),
                    chance: parseFloat(rowData[1][`worst${index}`])
                },
                normal: {
                    value: parseFloat(rowData[0][`normal${index}`]),
                    chance: parseFloat(rowData[1][`normal${index}`])
                },
                best: {
                    value: parseFloat(rowData[0][`best${index}`]),
                    chance: parseFloat(rowData[1][`best${index}`])
                },
            }));
            console.log(updatedData)
            const [updatedData2] = updatedData;
            dispatch(updateMacroData({ type, updatedData: updatedData2 }));
        };



        const customHeaders = {
            realIncome: "РРДН",
            workProgress: "ННЗП"
        };


        return (
            <div className={`${s['ag-theme-no-borders']} ${s.customGrid} ${s['ag-theme-alpine']}`}
                 style={{height: '300px', width: '100%', borderRadius: '10px', overflow: 'hidden'}}>
                <h3>{customHeaders[type]}</h3>
                <button onClick={handleSave}>Загрузить</button>
                <AgGridReact
                    columnDefs={columnDefs.map(colDef => {
                        if (colDef.children) {
                            colDef.children = colDef.children.map(childDef => ({
                                ...childDef,
                                valueFormatter: childDef.field.includes('worst') || childDef.field.includes('normal') || childDef.field.includes('best') ? valueFormatter : undefined
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
