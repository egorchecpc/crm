import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setMacroData} from '../../../redux/macroDataSlice';
import MacroTablesSettings from './MacroTablesSettings/MacroTablesSettings';
import Tables from './Tables/Tables';
import s from './MacroTables.module.css';


const MacroTables = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const macroSettings = useSelector(state => state.macroData.data);

    const handleAddMacroData = (formData) => {
        const updatedData = [...macroSettings];
        updatedData.push({
            type: formData.type,
            year: parseInt(formData.year),
            worst: {value: parseFloat(formData.worst.value), chance: parseFloat(formData.worst.chance)},
            normal: {value: parseFloat(formData.normal.value), chance: parseFloat(formData.normal.chance)},
            best: {value: parseFloat(formData.best.value), chance: parseFloat(formData.best.chance)},
        });
        dispatch(setMacroData(updatedData));
    };

    const groupedData = macroSettings.reduce((acc, item) => {
        if (!acc[item.type]) acc[item.type] = [];
        acc[item.type].push(item);
        return acc;
    }, {});

    return (
        <div className={s.macro}>
            <MacroTablesSettings
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddMacroData}
            />
            <div className={s.tables}>
                {Object.keys(groupedData).map(type => (
                    <div className={s.table} key={type}>
                        <Tables key={type} data={groupedData[type]} type={type}/>
                    </div>

                ))}
            </div>
            <div className={s.test}>
                <button className={s['add-button']} onClick={() => setIsModalOpen(true)}>+ Добавить макропоказатель
                </button>
            </div>
        </div>
    );
}

export default MacroTables;
