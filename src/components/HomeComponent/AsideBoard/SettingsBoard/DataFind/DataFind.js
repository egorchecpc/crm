import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './DataFind.module.css';
import { setFindSettings } from '../../../../../redux/settingsSlice';
import { ReactComponent as PencilIcon } from '../../../../../img/pencil.svg';
import { DayPicker, RussianLocale } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const options = {
    debtorType: ['Все', 'Физическое лицо', 'Юридическое лицо'],
    creditType: ['Все', 'Потребительский кредит', 'Ипотечный кредит'],
    productType: ['Все', 'Кредитная карта', 'Дебетовая карта'],
};

const DataFind = () => {
    const dataSettings = useSelector((state) => state.settings.settings);
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(dataSettings.selectedDate);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const handleSaveSettings = (newSettings) => {
        dispatch(setFindSettings(newSettings));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        handleSaveSettings({
            ...dataSettings,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        handleSaveSettings({
            ...dataSettings,
            selectedDate: date,
        });
        setIsCalendarOpen(false); // Закрыть календарь после выбора даты
    };

    const toggleCalendar = () => {
        setIsCalendarOpen(prev => !prev);
    };

    return (
        <div className={s.settings}>
            <div className={s.setting}>
                <h5>Тип должника</h5>
                <select
                    name="debtorType"
                    value={dataSettings.debtorType}
                    onChange={handleChange}
                    className={s.select}
                >
                    <option value="—" disabled>Выберите тип должника</option>
                    {options.debtorType.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <div className={s.setting}>
                <h5>Вид кредита</h5>
                <select
                    name="creditType"
                    value={dataSettings.creditType}
                    onChange={handleChange}
                    className={s.select}
                >
                    <option value="—" disabled>Выберите вид кредита</option>
                    {options.creditType.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <div className={s.setting}>
                <h5>Вид продукта</h5>
                <select
                    name="productType"
                    value={dataSettings.productType}
                    onChange={handleChange}
                    className={s.select}
                >
                    <option value="—" disabled>Выберите вид продукта</option>
                    {options.productType.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <div className={s.setting}>
                <h5>Дата</h5>
                <div className={s.datePickerWrapper}>
                    <input
                        type="text"
                        onClick={toggleCalendar}
                        value={selectedDate ? format(selectedDate, 'dd MMMM yyyy', { locale: ru }) : ''}
                        readOnly
                        className={s.dateInput}
                        placeholder="Выберите дату"
                    />
                    {isCalendarOpen && (
                        <DayPicker
                            selected={selectedDate}
                            onDayClick={handleDateChange}
                            locale={ru} // Используйте русскую локаль
                            className={s.dayPicker}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DataFind;
