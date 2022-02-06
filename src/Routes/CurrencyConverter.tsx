import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export const CurrencyConverter: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("lol");
  }, []);
  return <div>page</div>;
};
