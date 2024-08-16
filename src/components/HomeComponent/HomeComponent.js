import InfoTables from "./InfoTables/InfoTables";
import s from './HomeComponent.module.css'
import AsideBoard from "./AsideBoard/AsideBoard";


const HomeComponent = () => {
    return (
        <div className={s.wrapper}>
            <AsideBoard />
            <InfoTables />
        </div>
    )
}

export default HomeComponent
