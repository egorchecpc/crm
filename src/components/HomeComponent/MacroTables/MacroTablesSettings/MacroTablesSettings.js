import React, {useRef, useEffect} from 'react';
import s from './MacroTablesSettings.module.css';
import {ReactComponent as RightArrow} from '../../../../img/right-arrow.svg';
import {ReactComponent as LeftArrow} from '../../../../img/left-arrow.svg';

const MacroTablesSettings = ({isOpen, onClose, onSave}) => {
    const modalContentRef = useRef(null);
    const [formData, setFormData] = React.useState({
        type: '',
        worst: {value: '', chance: ''},
        normal: {value: '', chance: ''},
        best: {value: '', chance: ''},
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
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
                <h2 className={s.modalTitle}>Макро показатели</h2>
                <form className={s.form}>
                    <label className={s.label}>
                        Выберите макропоказатель
                        <select className={s.select} name="type" value={formData.type} onChange={handleInputChange}>
                            <option value='' disabled>Выберите тип</option>
                            <option value="realIncome">РРДН</option>
                            <option value="workProgress">ННЗП</option>
                        </select>
                    </label>
                    <label className={s.label}>
                        Введите год:
                        <input className={s.input} type="number" name="year" value={formData.year}
                               onChange={handleInputChange}/>
                    </label>
                    <div className={s.scenarioContainer}>
                        <div className={s.scenario}>
                            <h3 className={s.scenarioTitle}>Худший сценарий</h3>
                            <div className={s['form-data']}>
                                <label>
                                    Значение:
                                    <input className={s.input} type="number" name="worst.value"
                                           value={formData.worst.value}
                                           onChange={handleInputChange}/>
                                </label>
                                <label>
                                    Вероятность:
                                    <input className={s.input} type="number" name="worst.chance"
                                           value={formData.worst.chance}
                                           onChange={handleInputChange}/>
                                </label>
                            </div>
                        </div>
                        <div className={s.scenario}>
                            <h3 className={s.scenarioTitle}>Нормальный сценарий</h3>
                            <div className={s['form-data']}>
                                <label>
                                    Значение:
                                    <input className={s.input} type="number" name="normal.value"
                                           value={formData.normal.value}
                                           onChange={handleInputChange}/>
                                </label>
                                <label>
                                    Вероятность:
                                    <input className={s.input} type="number" name="normal.chance"
                                           value={formData.normal.chance}
                                           onChange={handleInputChange}/>
                                </label>
                            </div>
                        </div>
                        <div className={s.scenario}>
                            <h3 className={s.scenarioTitle}>Хороший сценарий</h3>
                            <div className={s['form-data']}>
                                <label>
                                    Значение:
                                    <input className={s.input} type="number" name="best.value"
                                           value={formData.best.value}
                                           onChange={handleInputChange}/>
                                </label>
                                <label>
                                    Вероятность:
                                    <input className={s.input} type="number" name="best.chance"
                                           value={formData.best.chance}
                                           onChange={handleInputChange}/>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={s['setting-buttons']}>
                        <div className={s.buttonContainer}>

                            <button type="button" className={`${s['back-button']} ${s['button']}`} onClick={onClose}>
                                <LeftArrow/>
                                Назад
                            </button>
                        </div>
                        <div className={s.buttonContainer}>
                            <button type="button" className={`${s['next-button']} ${s['button']}`} onClick={handleSave}>
                                Далее
                                <RightArrow/>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MacroTablesSettings;
