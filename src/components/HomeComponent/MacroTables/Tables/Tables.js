import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { setMacroData } from '../../../../redux/macroDataSlice';
import './Tables.module.css';

const Tables = () => {
    const dispatch = useDispatch();
    const macroSettings = useSelector(state => state.macroData);

    const columnDefs = [
        { headerName: "Сценарий", field: "scenario", headerClass: 'header-cell', width: 120 },
        ...macroSettings.data.map((item, index) => ({
            headerName: item.year.toString(),
            children: [
                { headerName: "Худш.", field: `worst${index}`, cellClass: 'bad', width: 80, editable: true },
                { headerName: "Норм", field: `normal${index}`, cellClass: 'normal', width: 80, editable: true },
                { headerName: "Лучш.", field: `best${index}`, cellClass: 'good', width: 80, editable: true }
            ]
        }))
    ];

    const rowData = [
        {
            scenario: "Значение",
            ...macroSettings.data.reduce((acc, item, index) => ({
                ...acc,
                [`worst${index}`]: item.worst.value,
                [`normal${index}`]: item.normal.value,
                [`best${index}`]: item.best.value
            }), {})
        },
        {
            scenario: "Вероятность",
            ...macroSettings.data.reduce((acc, item, index) => ({
                ...acc,
                [`worst${index}`]: `${item.worst.chance}%`,
                [`normal${index}`]: `${item.normal.chance}%`,
                [`best${index}`]: `${item.best.chance}%`
            }), {})
        },
    ];

    const valueFormatter = params => {
        return isNaN(params.value) ? params.value : params.value + '%';
    };

    const handleCellValueChanged = (params) => {
        const { data, colDef, newValue } = params;
        const yearIndex = colDef.field.match(/\d+/)[0];
        const scenarioType = colDef.field.match(/worst|normal|best/)[0];

        const updatedData = { ...macroSettings };
        updatedData.realIncome[yearIndex][scenarioType].value = newValue;

        dispatch(setMacroData(updatedData));
    };

    return (
        <div className="ag-theme-alpine custom-grid" style={{ height: '200px', width: '100%', borderRadius: '10px', overflow: 'hidden' }}>

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
            />
        </div>
    );
};

export default Tables;
