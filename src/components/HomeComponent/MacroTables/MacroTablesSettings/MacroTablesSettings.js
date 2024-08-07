import React, { useRef, useEffect } from 'react';
import s from './MacroTablesSettings.module.css';

const MacroTablesSettings = ({ isOpen, onClose, onSave }) => {
    const modalContentRef = useRef(null);
    const [formData, setFormData] = React.useState({
        type: '',
        year: '',
        worst: { value: '', chance: '' },
        normal: { value: '', chance: '' },
        best: { value: '', chance: '' },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [field, subField] = name.split('.');
            setFormData(prevState => ({
                ...prevState,
                [field]: {
                    ...prevState[field],
                    [subField]: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
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

    if (!isOpen) return null;

    return (
        <div className={s.modal}>
            <div className={s.modalContent} ref={modalContentRef}>
                <h2>Добавить макропараметры</h2>
                <form>
                    <label>
                        Тип макропараметра:
                        <select name="type" value={formData.type} onChange={handleInputChange}>
                            <option value='' disabled>Выберите тип</option>
                            <option value="realIncome">РРДН</option>
                            <option value="workProgress">ННЗП</option>
                        </select>
                    </label>
                    <label>
                        Год:
                        <input type="number" name="year" value={formData.year} onChange={handleInputChange} />
                    </label>
                    <fieldset>
                        <legend>Худший сценарий</legend>
                        <label>
                            Значение:
                            <input type="number" name="worst.value" value={formData.worst.value} onChange={handleInputChange} />
                        </label>
                        <label>
                            Вероятность:
                            <input type="number" name="worst.chance" value={formData.worst.chance} onChange={handleInputChange} />
                        </label>
                    </fieldset>
                    <fieldset>
                        <legend>Нормальный сценарий</legend>
                        <label>
                            Значение:
                            <input type="number" name="normal.value" value={formData.normal.value} onChange={handleInputChange} />
                        </label>
                        <label>
                            Вероятность:
                            <input type="number" name="normal.chance" value={formData.normal.chance} onChange={handleInputChange} />
                        </label>
                    </fieldset>
                    <fieldset>
                        <legend>Лучший сценарий</legend>
                        <label>
                            Значение:
                            <input type="number" name="best.value" value={formData.best.value} onChange={handleInputChange} />
                        </label>
                        <label>
                            Вероятность:
                            <input type="number" name="best.chance" value={formData.best.chance} onChange={handleInputChange} />
                        </label>
                    </fieldset>
                    <button type="button" onClick={handleSave}>Добавить</button>
                    <button type="button" onClick={onClose}>Отмена</button>
                </form>
            </div>
        </div>
    );
};

export default MacroTablesSettings;
