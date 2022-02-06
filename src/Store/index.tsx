import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import exhangeRateReducer from "./exchangeRates";

const reducer = combineReducers({
  exhangeRateReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware).concat(),
  devTools: process.env.NODE_ENV !== "production",
  // preloadedState,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
