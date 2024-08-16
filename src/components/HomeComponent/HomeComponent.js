import React, { useState } from 'react';
import InfoTables from "./InfoTables/InfoTables";
import s from './HomeComponent.module.css';
import AsideBoard from "./AsideBoard/AsideBoard";
import HeaderComponent from "./HeaderComponent/HeaderComponent";

const HomeComponent = () => {
    const [isAsideOpen, setIsAsideOpen] = useState(true);

    const toggleAside = () => {
        setIsAsideOpen(!isAsideOpen);
    };

    return (
        <div className={s.wrapper}>

            <div className={`${s.aside} ${!isAsideOpen ? s.asideClosed : ''}`}>
                <AsideBoard />
            </div>
            <div className={s.main}>
                <div className={s.header}>
                    <HeaderComponent/>
                </div>
                <InfoTables />
                <button className={s.toggleButton} onClick={toggleAside}>
                    {isAsideOpen ? '←' : '→'}
                </button>
            </div>
        </div>
    );
};

export default HomeComponent;
