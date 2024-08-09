import React, {useRef, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import s from './FindSettings.module.css';

const FindSettings = ({onClose, onSave, settings, options}) => {

    const modalContentRef = useRef(null);

    const [formData, setFormData] = React.useState({
        ...settings,
        dateRange: [null, null]
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
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
                <h2 className={s.modalTitle}>Изменить настройки</h2>
                <form className={s.form}>
                    <label className={s.label}>
                        <h3 className={s['date__header']}>Тип должника</h3>
                        <select
                            name="debtorType"
                            value={formData.debtorType}
                            onChange={handleChange}
                            className={s.select}
                        >
                            <option value="—" disabled>Выберите тип должника</option>
                            {options.debtorType.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label className={s.label}>
                        <h3 className={s['date__header']}>Вид кредита</h3>
                        <select
                            name="creditType"
                            value={formData.creditType}
                            onChange={handleChange}
                            className={s.select}
                        >
                            <option value="—" disabled>Выберите тип кредита</option>
                            {options.creditType.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label className={s.label}>
                        <h3 className={s['date__header']}>Вид продукта</h3>
                        <select
                            name="productType"
                            value={formData.productType}
                            onChange={handleChange}
                            className={s.select}
                        >
                            <option value="—" disabled>Выберите вид продукта</option>
                            {options.productType.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <div className={s['date-block']}>
                        <label className={s.label}>
                            <h3 className={s['date__header']}>Дата</h3>
                            <DatePicker
                                selected={formData.dateRange[0]}
                                onChange={handleDateChange}
                                startDate={formData.dateRange[0]}
                                endDate={formData.dateRange[1]}
                                selectsRange
                                inline
                            />
                        </label>
                    </div>
                    <div className={s.buttonContainer}>
                        <button className={`${s['next-button']} ${s['button']}`} onClick={handleSave}>Сохранить</button>
                        <button className={`${s['back-button']} ${s['button']}`} onClick={onClose}>Отмена</button>
                    </div>
                </form>


            </div>
        </div>
    );
}

export default FindSettings;
