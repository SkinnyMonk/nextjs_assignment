import { configureStore } from "@reduxjs/toolkit";
import populationReducer from "./populationSlice";
import indicatorReducer from "./indicatorSlice";
const store = configureStore({
  reducer: {
    populationSlice: populationReducer, // Add the population slice reducer here
    indicatorSlice: indicatorReducer, // Add the expectancy slice reducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
