import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import mealReducer from './mealSlice';

const store = configureStore({
     reducer: {
          appReducer: appReducer,
          mealReducer: mealReducer,
     },
});

export default store;
