import React from 'react';
import ExcelJS from 'exceljs';
import s from './FileUpload.module.css'


const FileUpload = ({ onFileUpload }) => {
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
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
    };

    return (
        <div className={s['file-upload-container']}>
            <label className={s['file-upload-label']}>Import File</label>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className={s['file-upload-input']}/>
        </div>
    );
};

export default FileUpload;
