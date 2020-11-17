import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Search from "./Search";
import Countries from "./Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        // handle success
        setCountries(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  let countriesToShow = filter
    ? countries.filter((x) =>
        x.name.toLowerCase().includes(filter.toLowerCase())
      )
    : countries;

  let count = null;
  if (countriesToShow.length <= 10 && countriesToShow.length >= 0) {
    count = true;
  } else {
    count = false;
  }

  let greaterThanOne = false;
  if (countriesToShow.length > 1) greaterThanOne = true;

  return (
    <div className="App">
      <Search onChange={handleFilterChange} />
      {count ? (
        countriesToShow.map((c, i) => (
          <Countries
            key={i}
            greaterThanOne={greaterThanOne}
            countries={c}
          />
        ))
      ) : (
        <p>please introduce a more specific filter</p>
      )}
    </div>
  );
};

export default App;
