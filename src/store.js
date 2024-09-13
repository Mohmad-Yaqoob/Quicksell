import { configureStore } from '@reduxjs/toolkit';

import { DataReducer, SelectDataReducer } from './Reducers/DataReducer.js';
const store = configureStore({
    reducer: {
        DataReducer, SelectDataReducer
    }
})
export default store;