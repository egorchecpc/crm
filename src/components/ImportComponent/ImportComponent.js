import React from 'react';
import ImportManager from "./ImportManager/ImportManager";
import TemplateManager from "./TemplateManager/TemplateManager";
import s from './ImportComponent.module.css';
import { useSelector } from 'react-redux';
import {saveData} from "../../api/api";

const ImportComponent = () => {
    const columns = useSelector((state) => state.data.columns);
    const rows = useSelector((state) => state.data.rows);
    const mappedData = useSelector((state) => state.data.mappedData);

    const handleSave = async () => {
        try {
            await saveData(mappedData);
            alert('Data saved successfully');
        } catch (error) {
            alert('Error saving data');
        }
    };

    return (
        <div className={s.container}>
            <div className={s['manager-container']}>
                <div className={s['import-manager']}>
                    <ImportManager />
                </div>
                <div className={s['template-manager']}>
                    <TemplateManager columns={columns} rows={rows} />
                </div>
            </div>
            <div className='btn-container'>
                <button className="btn accept-btn">Import</button>
                <button className="btn save-btn" onClick={handleSave}>Save results...</button>
                <button className="btn dissmiss-btn">Cancel</button>
            </div>
        </div>
    );
};

export default ImportComponent;
