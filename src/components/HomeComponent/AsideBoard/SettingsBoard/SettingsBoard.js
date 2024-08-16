import React from 'react';
import DataFind from "./DataFind/DataFind";
import s from './SettingsBoard.module.css'


const SettingsBoard = () => {
    return (
        <div className={s.board}>
            <h1>ЛОГО</h1>
            <DataFind/>
        </div>
    );
}

export default SettingsBoard;