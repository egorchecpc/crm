import React from 'react';
import DataFind from "./DataFind/DataFind";
import s from './SettingsBoard.module.css'
import Profile from "./Profile/Profile";

function SettingsBoard(props) {
    return (
        <div className={s.board}>
            <h1>Logo</h1>
            <DataFind />
            <button>Экспортировать</button>
            <Profile />
        </div>
    );
}

export default SettingsBoard;