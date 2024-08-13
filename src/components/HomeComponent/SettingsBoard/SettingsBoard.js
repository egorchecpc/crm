import React from 'react';
import DataFind from "./DataFind/DataFind";
import s from './SettingsBoard.module.css'
import Profile from "./Profile/Profile";
import {Link} from "react-router-dom";
import {ReactComponent as DownoloadIcon} from '../../../img/downoload.svg'
import SimpleImport from "./SimpleImport/SimpleImport";

const SettingsBoard = () => {
    return (
        <div className={s.board}>
            <h1>ЛОГО</h1>
            <DataFind/>
            <Link className={s.link} to="/import">
                <button className={s['export-button']}>
                    <DownoloadIcon />
                    Экспортировать
                </button>
            </Link>
            <SimpleImport />
            <Profile/>
        </div>
    );
}

export default SettingsBoard;