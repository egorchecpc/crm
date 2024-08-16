import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import {updateMacroData} from '../../../../../redux/macroDataSlice';
import s from './Tables.module.css';
import {ReactComponent as UploadIcon} from "../../../../../img/downoload.svg";
import {ReactComponent as PencilIcon} from "../../../../../img/pencil2.svg";


const Tables = ({data, type}) => {
    const dispatch = useDispatch();
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        const newRowData = [
            {
                scenario: "Значение",
                ...data.reduce((acc, item, index) => ({
                    ...acc,
                    [`worst${index}`]: parseFloat(item.worst.value),
                    [`normal${index}`]: parseFloat(item.normal.value),
                    [`best${index}`]: parseFloat(item.best.value),
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
    }, [data]);

    const columnDefs = [
        {headerName: "Сценарий", field: "scenario", headerClass: s.headerCell, width: 120},
        ...data.map((item, index) => ({
            headerName: item.year.toString(),
            headerClass: s.headerYear,
            children: [
                {
                    headerName: "Худш.",
                    field: `worst${index}`,
                    cellClass: s.bad,
                    headerClass: s.bad,
                    flex: 1,
                    editable: true,
                    maxWidth: 100
                },
                {
                    headerName: "Норм",
                    field: `normal${index}`,
                    cellClass: s.normal,
                    headerClass: s.normal,
                    flex: 1,
                    editable: true,
                    maxWidth: 100
                },
                {
                    headerName: "Лучш.",
                    field: `best${index}`,
                    cellClass: s.good,
                    headerClass: s.good,
                    flex: 1,
                    editable: true,
                    maxWidth: 100
                }
            ]
        }))
    ];

    const handleCellValueChanged = (params) => {
        const {colDef, newValue, rowIndex} = params;
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
        dispatch(updateMacroData({type, updatedData}));
    };

    const nameChanger = {
        realIncome: 'РРДН',
        workProgress: 'ННЗП'
    }

    return (
        <div className={s.table}>
            {rowData
                ? <div className={s['table-header']}>
                    <div className={s['table-title']}>
                        <h3>{nameChanger[type]}</h3>
                        <div className={s.icon}><PencilIcon/></div>
                    </div>
                    <div className={s.icon} onClick={handleSave}>
                        <UploadIcon/>
                    </div>
                </div>
                : ''
            }
            <div className='ag-theme-quartz'>
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
                    onCellValueChanged={handleCellValueChanged}
                />
            </div>
        </div>
    );

};

export default Tables;
