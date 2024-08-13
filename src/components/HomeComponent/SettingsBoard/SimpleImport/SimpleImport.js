import React from 'react';
import ExcelJS from 'exceljs';
import Papa from 'papaparse';
import { useDispatch } from 'react-redux';
import { setRows, setColumns, setMappedData } from '../../../../redux/tableDataSlice';
import { saveData } from '../../../../api/api';
import s from './SimpleImport.module.css'

const SimpleImport = () => {
    const dispatch = useDispatch();

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const fileExtension = file.name.split('.').pop().toLowerCase();

        if (!file) return;

        let data = [];

        if (fileExtension === 'csv') {
            Papa.parse(file, {
                complete: (result) => {
                    data = result.data;
                    processData(data);
                },
                header: false
            });
        } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
            const reader = new FileReader();
            reader.onload = async () => {
                const workbook = new ExcelJS.Workbook();
                await workbook.xlsx.load(file);
                const worksheet = workbook.getWorksheet(1);
                worksheet.eachRow((row) => {
                    const rowData = [];
                    row.eachCell((cell) => {
                        rowData.push(cell.value);
                    });
                    data.push(rowData);
                });
                processData(data);
            };
            reader.readAsArrayBuffer(file);
        } else {
            alert('Unsupported file format. Please upload an .xlsx, .xls, or .csv file.');
        }
    };

    const processData = (data) => {
        const headers = data[0];
        const rows = data.slice(1).map(row => {
            let rowData = {};
            headers.forEach((header, index) => {
                rowData[header] = row[index];
            });
            return rowData;
        });

        dispatch(setColumns(headers.map(header => ({
            headerName: header,
            field: header
        }))));
        dispatch(setRows(rows));

        // Автоматическое сопоставление данных
        const templateFields = ['masterInvestorCode', 'code', 'name', 'accountType', 'baseCurrency', 'inventoryMethod', 'date', 'sec1256'];
        const defaultMappings = {};
        templateFields.forEach((field, index) => {
            if (headers[index]) {
                defaultMappings[field] = headers[index];
            }
        });

        const mappedData = rows.map(row => {
            let mappedRow = {};
            templateFields.forEach(field => {
                mappedRow[field] = row[defaultMappings[field]] || '';
            });
            return mappedRow;
        });

        dispatch(setMappedData(mappedData));

        saveData(mappedData).then(() => {
            alert('Data imported and saved successfully');
        }).catch(() => {
            alert('Error saving data');
        });
    };

    return (
        <div className={s["file-upload-container"]}>
            <label className={s["import-button"]} onChange={handleFileUpload} htmlFor="file-upload">
                <input className={s["file-upload-input"]} type="file" accept=".xlsx, .xls, .csv" id="file-upload"/>
                Импортировать
            </label>
        </div>
);
};

export default SimpleImport;
