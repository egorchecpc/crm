import React, { useState } from 'react';
import FileUpload from "./FileUpload";
import { useDispatch } from 'react-redux';
import { setColumns, setRows } from '../../../redux/tableDataSlice';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ImportManager = () => {
    const [rowData, setRowData] = useState([]);
    const [columns, setColumnsState] = useState([]);
    const dispatch = useDispatch();

    const handleFileUpload = (data) => {
        const headers = data[0];
        const rows = data.slice(1).map(row => {
            let rowData = {};
            headers.forEach((header, index) => {
                rowData[header] = row[index];
            });
            return rowData;
        });

        const columnDefs = headers.map(header => ({
            headerName: header,
            field: header,
            editable: true,
        }));

        setColumnsState(columnDefs);
        setRowData(rows);
        dispatch(setColumns(columnDefs));
        dispatch(setRows(rows));
    };

    return (
        <div>
            <FileUpload onFileUpload={handleFileUpload} />
            <div>Доп. настройки</div>
            {columns.length > 0 && (
                <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columns}
                    />
                </div>
            )}
        </div>
    );
};

export default ImportManager;
