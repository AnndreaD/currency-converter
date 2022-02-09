import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../Store";

export const ConversionHistory = () => {
  const history = useSelector((state: RootState) => state.exhangeRates.history);

  return (
    <Table bordered hover style={{ maxWidth: "800px" }}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Currency from</th>
          <th>Rate</th>
          <th>Amount</th>
          <th>Currency To</th>
          <th>Rate</th>
          <th>Result</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {history.map((i) => (
          <tr>
            <td>{i.date}</td>
            <td>{i.fromCurrency}</td>
            <td>{i.fromRate}</td>
            <td>{i.amount}</td>
            <td>{i.toCurrency}</td>
            <td>{i.toRate}</td>
            <td>{i.result}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
