import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settingsSlice';
import macroReducer from './macroDataSlice';
const store = configureStore({
    reducer: {
        settings: settingsReducer,
        macroData: macroReducer,
    },
});

export default store;
