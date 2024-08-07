import React, {useRef, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import s from './FindSettings.module.css';

function FindSettings({ onClose, onSave, settings, options }) {

    const modalContentRef = useRef(null);

    const [formData, setFormData] = React.useState({
        ...settings,
        dateRange: [null, null]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setFormData({
            ...formData,
            dateRange: [start, end],
        });
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    const handleOutsideClick = (e) => {
        if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className={s.modal}>
            <div className={s.modalContent} ref={modalContentRef}>
                <h2>Изменить настройки</h2>
                <div className={s.formGroup}>
                    <label>Тип должника</label>
                    <select
                        name="debtorType"
                        value={formData.debtorType}
                        onChange={handleChange}
                    >
                        <option value="—" disabled>Выберите тип должника</option>
                        {options.debtorType.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <div className={s.formGroup}>
                    <label>Вид кредита</label>
                    <select
                        name="creditType"
                        value={formData.creditType}
                        onChange={handleChange}
                    >
                        <option value="—" disabled>Выберите тип кредита</option>
                        {options.creditType.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <div className={s.formGroup}>
                    <label>Вид продукта</label>
                    <select
                        name="productType"
                        value={formData.productType}
                        onChange={handleChange}
                    >
                        <option value="—" disabled>Выберите вид продукта</option>
                        {options.productType.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <div className={s.formGroup}>
                    <label>Дата</label>
                    <DatePicker
                        selected={formData.dateRange[0]}
                        onChange={handleDateChange}
                        startDate={formData.dateRange[0]}
                        endDate={formData.dateRange[1]}
                        selectsRange
                        inline
                    />
                </div>
                <button onClick={handleSave}>Сохранить</button>
                <button onClick={onClose}>Отмена</button>
            </div>
        </div>
    );
}

export default FindSettings;
