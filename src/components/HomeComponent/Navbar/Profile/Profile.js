import React from 'react';
import s from './Profile.module.css'
import photo from '../../../../img/photo.png'
import {ReactComponent as ArrowIcon} from "../../../../img/down-arrow.svg";

const Profile = (props) => {
    return (
        <div className={s.profile}>
            <div className={s['profile-photo']}>
                <img src={photo} alt='worker' />
            </div>
            <div className={s['profile-data']}>
                <div className={s.name}>Мария Сидорова</div>
                <div className={s.position}>Сотрудник</div>
            </div>
            <ArrowIcon />
        </div>
    );
}

export default Profile;