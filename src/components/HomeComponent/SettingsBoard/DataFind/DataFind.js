import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import s from './DataFind.module.css';
import FindSettings from './FindSettings/FindSettings';
import {setFindSettings} from '../../../../redux/settingsSlice';

const options = {
    debtorType: ['Все', 'Физическое лицо', 'Юридическое лицо'],
    creditType: ['Все', 'Потребительский кредит', 'Ипотечный кредит'],
    productType: ['Все', 'Кредитная карта', 'Дебетовая карта'],
};

const DataFind = (props) => {
    const [modalWindow, setModalWindow] = React.useState(false);
    const dataSettings = useSelector((state) => state.settings.settings);
    const dispatch = useDispatch();

    const onChangeSettings = () => {
        setModalWindow(prevState => !prevState);
        console.log(dataSettings)
    };

    const handleSaveSettings = (newSettings) => {
        dispatch(setFindSettings(newSettings));
    };

    return (
        <div className={s.settings}>
            <div className={s.setting}>
                <h5>Тип должника</h5>
                <div>{dataSettings.debtorType}</div>
            </div>
            <div className={s.setting}>
                <h5>Вид кредита</h5>
                <div>{dataSettings.creditType}</div>
            </div>
            <div className={s.setting}>
                <h5>Вид продукта</h5>
                <div>{dataSettings.productType}</div>
            </div>
            <div className={s.setting}>
                <h5>Дата</h5>
                <div>
                    {dataSettings.dateRange[0] && dataSettings.dateRange[1]
                        ? `${dataSettings.dateRange[0].toLocaleDateString()} - ${dataSettings.dateRange[1].toLocaleDateString()}`
                        : '—'}
                </div>
            </div>
            <button onClick={onChangeSettings}>Изменить</button>
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
