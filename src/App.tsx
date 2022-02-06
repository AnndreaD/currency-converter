import React from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { CurrencyConverter } from "./Routes/CurrencyConverter";

export const App: React.FC = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>Hello thunkMiddleware</p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
      <CurrencyConverter />
    </div>
  );
};
