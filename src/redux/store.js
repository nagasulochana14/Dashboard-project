// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardSlice';
import uiReducer from './uiSlice';

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    ui: uiReducer,
  },
});

export default store;
