import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = (props) => {
  if(props.stats === 0 || isNaN(props.stats)) {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
      <table>
        <tbody>
        <tr>
           <th>{props.text}</th>
           <td>{props.stats}</td>
        </tr>
        </tbody>
      </table>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [good, setGoods] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allOpinions, setAll] = useState(0);

  const average = (good - bad) / allOpinions;
  const positive = (good / allOpinions) * 100;

  const handleGoods = () => {
    setAll(allOpinions + 1);
    setGoods(good + 1);
  };

  const handleNeutrals = () => {
    setAll(allOpinions + 1);
    setNeutral(neutral + 1);
  };

  const handleBads = () => {
    setAll(allOpinions + 1);
    setBad(bad + 1);
  };

  return (
    <div>
      <h4>give feedback</h4>
      <Button onClick={handleGoods} text="good" />
      <Button onClick={handleNeutrals} text="neutral" />
      <Button onClick={handleBads} text="bad" />
      <h4>statistics</h4>
      <Statistics text="good" stats={good} />
      <Statistics text="neutral" stats={neutral} />
      <Statistics text="bad" stats={bad} />
      <Statistics text="average" stats={average} />
      <Statistics text="positive" stats={positive} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
