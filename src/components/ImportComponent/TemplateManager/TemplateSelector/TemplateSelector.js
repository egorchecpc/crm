import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import s from './TemplateSelector.module.css';
import { setMappedData, setFieldMappings } from '../../../../redux/dataSlice';


const TemplateSelector = () => {
    const columns = useSelector((state) => state.data.columns);
    const rows = useSelector((state) => state.data.rows);

    const mappedData = useSelector((state) => state.data.mappedData);
    const fieldMappings = useSelector((state) => state.data.fieldMappings);

    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [columnDefs, setColumnDefs] = useState([]);

    const dispatch = useDispatch();

    const templates = ['Template 1', 'Template 2', 'Template 3'];

    useEffect(() => {
        if (columns.length > 0) {
            initializeFieldMappings();
        }
    }, [columns, selectedTemplate]);

    const initializeFieldMappings = () => {
        if (selectedTemplate === 'Template 1') {
            const templateFields = ['masterInvestorCode', 'code', 'name', 'accountType', 'baseCurrency', 'inventoryMethod', 'date', 'sec1256'];
            const defaultMappings = {};
            templateFields.forEach((field, index) => {
                if (columns[index]) {
                    defaultMappings[field] = columns[index].field;
                }
            });
            dispatch(setFieldMappings(defaultMappings));
        }
    };

    const handleTemplateChange = (e) => {
        const templateName = e.target.value;
        setSelectedTemplate(templateName);
        if (templateName === 'Template 1') {
            setColumnDefs([
                { headerName: 'Master Investor Code (FA)', field: 'masterInvestorCode' },
                { headerName: 'Code (FB)', field: 'code' },
                { headerName: 'Name (FC)', field: 'name' },
                { headerName: 'Account Type (FD)', field: 'accountType' },
                { headerName: 'Base Currency (FE)', field: 'baseCurrency' },
                { headerName: 'Inventory method (FF)', field: 'inventoryMethod' },
                { headerName: 'Date (FG)', field: 'date' },
                { headerName: 'Sec 1256 (FH)', field: 'sec1256' },
            ]);
        } else {
            setColumnDefs([]);
        }
    };

    const handleFieldChange = (field, value) => {
        dispatch(setFieldMappings({
            ...fieldMappings,
            [field]: value,
        }));
    };

    const handleCheck = () => {
        const newData = rows.map((row) => {
            let mappedRow = {};
            columnDefs.forEach((colDef) => {
                mappedRow[colDef.field] = row[fieldMappings[colDef.field]] || '';
            });
            return mappedRow;
        });
        dispatch(setMappedData(newData));
    };

    return (
        <div className="template-manager">
            <div className={s['template-header']}>
                <label htmlFor="template-select">Template</label>
                <select id="template-select" value={selectedTemplate} onChange={handleTemplateChange}>
                    <option value="" disabled>Select a template</option>
                    {templates.map((template) => (
                        <option key={template} value={template}>{template}</option>
                    ))}
                </select>
            </div>
            <div className="template-preview ag-theme-alpine" style={{ height: 120, width: '100%' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={[fieldMappings]}
                />
            </div>
            <div className={s['template-settings']}>
                {selectedTemplate && (
                    <div className={s['template-fields']}>
                        {columnDefs.map((colDef) => (
                            <div key={colDef.field} className={s['template-field']}>
                                <label>{colDef.headerName}</label>
                                <select
                                    value={fieldMappings[colDef.field] || ''}
                                    onChange={(e) => handleFieldChange(colDef.field, e.target.value)}
                                >

                                    <option value="" disabled>Select a column</option>
                                    {columns.map((column) => (
                                        <option key={column.field} value={column.field}>{column.headerName}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                        <button onClick={handleCheck}>Check</button>
                    </div>
                )}
            </div>
            {mappedData.length > 0 && (
                <div>
                    <div className="template-data ag-theme-alpine" style={{ height: 400, width: '100%', marginTop: 20 }}>
                        <AgGridReact
                            columnDefs={columnDefs}
                            rowData={mappedData}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TemplateSelector;
