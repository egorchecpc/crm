import s from './AsideBoard.module.css'
import MacroTables from "./MacroTables/MacroTables";
import SettingsBoard from "./SettingsBoard/SettingsBoard";




const AsideBoard = () => {
    return (
        <div className={s['aside-board']}>
            <SettingsBoard />
            <MacroTables />
        </div>
    )
}

export default AsideBoard;
