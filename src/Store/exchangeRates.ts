import { Dispatch } from "react";
import { getExhangeRates } from "../Api-client";

//TODO Move out types and interfaces
//TODO write tests

export enum Actions {
  SET_INITIAL_DATA = "SET_INITIAL_DATA",
  SET_CONVERISON = "SET_CONVERISON",
  LOGG_HISTORY = "LOGG_HISTORY",
  SET_ERROR = "SET_ERROR",
}

export type Action =
  | { type: Actions.SET_INITIAL_DATA; payload: any }
  | { type: Actions.SET_CONVERISON; payload: number }
  | { type: Actions.SET_ERROR; error: any }
  | { type: Actions.LOGG_HISTORY; payload: Object };

export type ExchangeRateState = {
  data: CurrencyIndexer;
  apiError: any;
  converisionResult: number;
  history: Array<Object>;
};

const initialState: ExchangeRateState = {
  data: {},
  apiError: undefined,
  converisionResult: 0,
  history: [],
};

export default function exhangeRates(
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
    case Actions.SET_CONVERISON: {
      return {
        ...state,
        converisionResult: action.payload,
      };
    }
    case Actions.LOGG_HISTORY: {
      return {
        ...state,
        history: [...state.history, action.payload],
      };
    }
    default:
      return state;
  }
}

export const getExhangeData = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const data: Array<any> = await getExhangeRates();
      const d = mapper(data);

      dispatch({ type: Actions.SET_INITIAL_DATA, payload: d });
    } catch (err: any) {
      console.error("error: ", err);
      dispatch({
        type: Actions.SET_ERROR,
        error: err?.toString(),
      });
    }
  };
};

const mapper = (array: Indexer[]) => {
  const myMap: CurrencyIndexer = {};

  array.forEach((obj) => {
    const dateString = obj["Date"];
    myMap[dateString] = {};

    for (const [key, value] of Object.entries(obj)) {
      // Exclude empty keys
      if (key !== "" && key !== "Date") {
        // Exclude Currencies with no valid data
        if (value !== "N/A") {
          myMap[dateString][key] = value;
        }
      }
    }
  });

  return myMap;
};

export const setConversionResult = (data: CurrencyConversion) => {
  return async (dispatch: Dispatch<Action>) => {
    const result = (data.amount * data.fromRate) / data.toRate;
    dispatch({ type: Actions.SET_CONVERISON, payload: result });
    dispatch({ type: Actions.LOGG_HISTORY, payload: data });
  };
};

export interface CurrencyConversion {
  fromCurrency: string;
  fromRate: number;
  toCurrency: string;
  toRate: number;
  date: string;
  amount: number;
}

type Indexer<T = any> = Object & {
  [key: string]: T;
};

export type CurrencyIndexer = Indexer<Indexer<number>>;
