import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store";
import { getExhangeData, setConversionResult } from "../Store/exchangeRates";

//TODO 1. Add validation on values
//TODO 2. filter out selected currency from dropdown 1 in dropdown 2
//TODO 3. cleaner rendering and component split
//TODO 4. add loading state

export const CurrencyConverter = () => {
  const data = useSelector((state: RootState) => state.exhangeRates.data);
  const logg = useSelector((state: RootState) => state.exhangeRates.history);
  const resultz = useSelector(
    (state: RootState) => state.exhangeRates.converisionResult
  );
  const [valueToconvert, setValueToConvert] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCurrencyFrom, setSelecteCurrencyFrom] = useState("");
  const [selectedCurrencyTo, setSelecteCurrencyTo] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExhangeData());
  }, [dispatch]);

  const renderSelections = (object: any) => {
    let list = [
      <option key={"select"} value={"select"}>
        "select"
      </option>,
    ];
    for (const [key, value] of Object.entries(object)) {
      list.push(
        <option key={key} value={key}>
          {key}
        </option>
      );
    }
    return list;
  };

  const onConvert = () => {
    dispatch(
      setConversionResult({
        fromCurrency: selectedCurrencyFrom,
        fromRate: data[selectedDate][selectedCurrencyFrom],
        toCurrency: selectedCurrencyTo,
        toRate: data[selectedDate][selectedCurrencyTo],
        date: selectedDate,
        amount: valueToconvert,
      })
    );
  };

  return (
    <div>
      <h1> Currency converter</h1>
      <div
        style={{
          backgroundColor: "#f5ecff",
          margin: "64px",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <h3> 1. Select date</h3>
        <Form.Select
          aria-label='select-date'
          onChange={(e) => setSelectedDate(e.target.value.toString())}
        >
          {renderSelections(data)}
        </Form.Select>
        <br></br>
        <br></br>
        <br></br>
        <h3> 2. Select curriencies and amount to convert</h3>
        <br></br>
        <br></br>
        <Form
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Form.Group
            className='mb-3'
            controlId='Currency1'
            style={{ display: "inline-flex" }}
          >
            <Form.Label>Currency i have</Form.Label>
            <Form.Control
              type='number'
              placeholder='value'
              onChange={(e) => setValueToConvert(parseInt(e.target.value))}
              value={valueToconvert}
            />
            {selectedDate && (
              <Form.Select
                aria-label='select-date'
                value={selectedCurrencyFrom}
                onChange={(e) =>
                  setSelecteCurrencyFrom(e.target.value.toString())
                }
              >
                {renderSelections(data[selectedDate])}
              </Form.Select>
            )}
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Currency i want</Form.Label>
            <Form.Control type='number' readOnly value={resultz} />
            {selectedDate && (
              <Form.Select
                aria-label='select-date'
                value={selectedCurrencyTo}
                onChange={(e) =>
                  setSelecteCurrencyTo(e.target.value.toString())
                }
              >
                {renderSelections(data[selectedDate])}
              </Form.Select>
            )}
          </Form.Group>
          <Button onClick={() => onConvert()}>Convert</Button>
        </Form>
      </div>
      {logg.map((i) => (
        <p>{JSON.stringify(i)}</p>
      ))}
    </div>
  );
};
