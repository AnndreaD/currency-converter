import { Dispatch } from "react";
import { getExhangeRates } from "../Api-client";
import { CurrencyConversion } from "../types";

export enum Actions {
  SET_INITIAL_DATA = "SET_INITIAL_DATA",
  GET_CONVERISON = "GET_CONVERISON",
  GET_CURRENCIES = "GET_CURRENCIES",
  SET_ERROR = "SET_ERROR",
}

export type Action =
  | { type: Actions.SET_INITIAL_DATA; payload: unknown }
  | { type: Actions.GET_CONVERISON; payload: CurrencyConversion }
  | { type: Actions.GET_CURRENCIES }
  | { type: Actions.SET_ERROR; error: any };

export type ExchangeRateState = {
  data: any;
  apiError: any;
};

const initialState: ExchangeRateState = {
  data: undefined,
  apiError: undefined,
};

export default function exhangeRateReducer(
  state = initialState,
  action: Action
): ExchangeRateState {
  switch (action.type) {
    case Actions.SET_INITIAL_DATA: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default:
      return state;
  }
}

export const getExhangeData = (activeOnly = false) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const data = await getExhangeRates();
      dispatch({ type: Actions.SET_INITIAL_DATA, payload: data });
    } catch (err: any) {
      console.error("error: ", err);
      dispatch({
        type: Actions.SET_ERROR,
        error: err?.toString(),
      });
    }
  };
};
