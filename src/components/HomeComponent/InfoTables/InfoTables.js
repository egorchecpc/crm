import React from 'react';
import LGDTable from "./LGDTable/LGDTable";
import EADTable from "./EADTable/EADTable";
import PDTable from "./PDTable/PDTable";
import ECLTable from "./ECLTable/ECLTable";
import s from './InfoTables.module.css';

const InfoTables = () => {
    return (
        <div className={s.tables}>
            <div className={s['pd-table']}><PDTable/></div>
            <div className={s['group-tables']}>
                <div className={s['lgd-table']}><LGDTable/></div>
                <div className={s['ead-table']}><EADTable/></div>
            </div>
            <div className={s['ecl-table']}><ECLTable /></div>
        </div>
    );
}

export default InfoTables;