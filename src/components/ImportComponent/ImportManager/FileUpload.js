import React from 'react';
import ExcelJS from 'exceljs';
import Papa from 'papaparse';
import s from './FileUpload.module.css'

const FileUpload = ({ onFileUpload }) => {
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const fileExtension = file.name.split('.').pop().toLowerCase();

        if (fileExtension === 'csv') {
            Papa.parse(file, {
                complete: (result) => {
                    const data = result.data;
                    onFileUpload(data);
                },
                header: false
            });
        } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
            const reader = new FileReader();
            reader.onload = async () => {
                const workbook = new ExcelJS.Workbook();
                await workbook.xlsx.load(file);
                const worksheet = workbook.getWorksheet(1);
                const data = [];

                worksheet.eachRow((row, rowNumber) => {
                    const rowData = [];
                    row.eachCell((cell, colNumber) => {
                        rowData.push(cell.value);
                    });
                    data.push(rowData);
                });

                onFileUpload(data);
            };

            reader.readAsArrayBuffer(file);
        } else {
            alert('Unsupported file format. Please upload an .xlsx, .xls, or .csv file.');
        }
    };

    return (
        <div className={s['file-upload-container']}>
            <label className={s['file-upload-label']}>Import File</label>
            <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} className={s['file-upload-input']}/>
        </div>
    );
};

export default FileUpload;
