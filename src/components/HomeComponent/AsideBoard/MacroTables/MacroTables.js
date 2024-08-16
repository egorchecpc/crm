import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addMacroData} from '../../../../redux/macroDataSlice';
import MacroTablesSettings from './MacroTablesSettings/MacroTablesSettings';
import Tables from './Tables/Tables';
import { v4 as uuidv4 } from 'uuid';
import s from './MacroTables.module.css';

const MacroTables = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const macroSettings = useSelector(state => state.macroData.data);

    const handleAddMacroData = (formData) => {
        const newData = {
            id: uuidv4(),
            year: parseInt(formData.year),
            worst: { value: formData.worst.value, change: parseFloat(formData.worst.chance) },
            normal: { value: formData.normal.value, change: parseFloat(formData.normal.chance) },
            best: { value: formData.best.value, change: parseFloat(formData.best.chance) },
        };

        dispatch(addMacroData({
            type: formData.type,
            newData,
        }));
    };

    return (
        <div className={s.macro}>
            <MacroTablesSettings
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddMacroData}
            />
            <div className={s.tables}>
                {macroSettings.map((item) => (
                    <div className={s.table} key={item.type}>
                        <Tables data={item.data} type={item.type}/>
                    </div>
                ))}
            </div>
            <div className={s.test}>
                <button className={s['add-button']} onClick={() => setIsModalOpen(true)}>+ Добавить макропоказатель</button>
            </div>
        </div>
    );
}

export default MacroTables;
