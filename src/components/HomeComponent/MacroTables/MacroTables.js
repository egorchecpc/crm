import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setMacroData } from '../../../redux/macroDataSlice';
import MacroTablesSettings from './MacroTablesSettings/MacroTablesSettings';
import Tables from './Tables/Tables';

function MacroTables() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const macroSettings = useSelector(state => state.macroData.data);

    const handleAddMacroData = (formData) => {
        const updatedData = [...macroSettings];
        updatedData.push({
            type: formData.type,
            year: parseInt(formData.year),
            worst: { value: parseFloat(formData.worst.value), chance: parseFloat(formData.worst.chance) },
            normal: { value: parseFloat(formData.normal.value), chance: parseFloat(formData.normal.chance) },
            best: { value: parseFloat(formData.best.value), chance: parseFloat(formData.best.chance) },
        });
        dispatch(setMacroData(updatedData));
    };

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>Добавить макропараметры</button>
            <MacroTablesSettings
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddMacroData}
            />
            <Tables />
        </div>
    );
}

export default MacroTables;
