import SettingsBoard from "./SettingsBoard/SettingsBoard";
import MacroTables from "./MacroTables/MacroTables";
import InfoTables from "./InfoTables/InfoTables";
import s from './HomeComponent.module.css'


const HomeComponent = () => {
    return (
        <div className={s.wrapper}>
            <SettingsBoard />
            <MacroTables />
            <InfoTables />
        </div>
    )
}

export default HomeComponent
