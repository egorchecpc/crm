import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import s from './DataFind.module.css';
import FindSettings from './FindSettings/FindSettings';
import {setFindSettings} from '../../../../redux/settingsSlice';
import {ReactComponent as PencilIcon} from '../../../../img/pencil.svg'

const options = {
    debtorType: ['Все', 'Физическое лицо', 'Юридическое лицо'],
    creditType: ['Все', 'Потребительский кредит', 'Ипотечный кредит'],
    productType: ['Все', 'Кредитная карта', 'Дебетовая карта'],
};

const DataFind = () => {
    const [modalWindow, setModalWindow] = React.useState(false);
    const dataSettings = useSelector((state) => state.settings.settings);
    const dispatch = useDispatch();

    const onChangeSettings = () => {
        setModalWindow(prevState => !prevState);
        console.log(dataSettings);
    };

    const handleSaveSettings = (newSettings) => {
        dispatch(setFindSettings(newSettings));
    };

    return (
        <div className={s.settings}>
            <div className={s.setting}>
                <h5>Тип должника</h5>
                <div>{dataSettings.debtorType.toString()}</div>
            </div>
            <div className={s.setting}>
                <h5>Вид кредита</h5>
                <div>{dataSettings.creditType.toString()}</div>
            </div>
            <div className={s.setting}>
                <h5>Вид продукта</h5>
                <div>{dataSettings.productType.toString()}</div>
            </div>
            <div className={s.setting}>
                <h5>Дата</h5>
                <div>
                    {dataSettings.selectedDate
                        ? dataSettings.selectedDate.toLocaleDateString()
                        : '—'}
                </div>
            </div>
            <button className={s['change-button']} onClick={onChangeSettings}>
                <PencilIcon />
                Изменить
            </button>

            {modalWindow && (
                <FindSettings
                    onClose={onChangeSettings}
                    onSave={handleSaveSettings}
                    settings={dataSettings}
                    options={options}
                />
            )}
        </div>
    );
}

export default DataFind;
