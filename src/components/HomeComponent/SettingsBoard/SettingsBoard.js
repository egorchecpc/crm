import React from 'react';
import DataFind from "./DataFind/DataFind";
import s from './SettingsBoard.module.css'
import Profile from "./Profile/Profile";
import {Link} from "react-router-dom";

const SettingsBoard = (props) => {
    return (
        <div className={s.board}>
            <h1>Logo</h1>
            <DataFind/>
            <Link to="/import">
                <button>Экспортировать</button>
            </Link>
            <Profile/>
        </div>
    );
}

export default SettingsBoard;