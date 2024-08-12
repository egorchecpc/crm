import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import {updateMacroData} from '../../../../redux/macroDataSlice';
import s from './Tables.module.css';
import {ReactComponent as UploadIcon} from "../../../../img/downoload.svg";
import {ReactComponent as PencilIcon} from "../../../../img/pencil2.svg";
import CustomHeaderGroupComponent from './CustomHeaderGroupComponent';

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

    useEffect(() => {
        console.log('Updated rowData', rowData)
    }, [rowData]);

    const columnDefs = [
        {headerName: "Сценарий", field: "scenario", headerClass: s.headerCell, width: 120},
        ...data.map((item, index) => ({
            headerName: item.year.toString(),
            headerGroupComponent: 'customHeaderGroupComponent',
            children: [
                {
                    headerName: "Худш.",
                    field: `worst${index}`,
                    cellClass: s.bad,
                    headerClass: s.bad,
                    width: 67,
                    editable: true
                },
                {
                    headerName: "Норм",
                    field: `normal${index}`,
                    cellClass: s.normal,
                    headerClass: s.normal,
                    width: 67,
                    editable: true
                },
                {
                    headerName: "Лучш.",
                    field: `best${index}`,
                    cellClass: s.good,
                    headerClass: s.good,
                    width: 67,
                    editable: true,
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

        console.log(updatedData);
        dispatch(updateMacroData({type, updatedData}));
    };

    const nameChanger = {
        realIncome: 'РРДН',
        workProgress: 'ННЗП'
    }

    return (
        <div className={s.table}    >
            {rowData
                ?<div className={s['table-header']}>
                    <div className={s['table-title']}>
                        <h3>{nameChanger[type]}</h3>
                        <div className={s.icon}><PencilIcon/></div>
                    </div>
                    <div className={s.icon} onClick={handleSave}>
                        <UploadIcon/>
                    </div>
                </div>
                :''
            }
            <div className={s['ag-theme-quartz']}>
                <button onClick={()=>console.log('Column Defs:', columnDefs, 'Row Data:', rowData)}>Дата</button>
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
                components={{ customHeaderGroupComponent: CustomHeaderGroupComponent }}
            />
            </div>
        </div>
    );

};

export default Tables;
