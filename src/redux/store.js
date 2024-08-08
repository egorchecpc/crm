import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settingsSlice';
import macroReducer from './macroDataSlice';
import dataReducer from './dataSlice';


const store = configureStore({
    reducer: {
        settings: settingsReducer,
        macroData: macroReducer,
        data: dataReducer,
    },
});

export default store;
