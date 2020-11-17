import React, { useState, useEffect } from "react";
import axios from "axios";

const showMore = (capital) => {
  const x = document.getElementById(capital);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
};

const Countries = ({ greaterThanOne, countries }) => {
  const [weather, setWeather] = useState([]);

    axios
      .get(`http://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: countries.capital
            ? countries.capital
            : "New York",
          appid: "9cdb46b173fdb19090ddd20538599a5a",
        },
      })
      .then((response) => {
        setWeather(response.data.weather);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

  if (greaterThanOne === true) {
    console.log(countries);
    return (
      <div>
        <ul>
          <li>
            {countries.name} ---{" "}
            <button onClick={() => showMore(countries.name)}>show</button>{" "}
          </li>
          <div id={countries.name} style={{ display: "none" }}>
            <br />
            <img alt="country-flag" src={countries.flag} width="240" />
            <h1>{countries.name}</h1>
            <ul>
              <p>Capital: {countries.capital}</p>
              <p>Population: {countries.population}</p>
            </ul>
            <ul>
              <p>Languages:</p>
              <li>{countries.languages.map((x) => x.name)}</li>
            </ul>
          </div>
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <br />
        <img alt="country-flag" src={countries.flag} width="240" />
        <h1>{countries.name}</h1>
        <ul>
          <p>Capital: {countries.capital}</p>
          <p>Population: {countries.population}</p>
        </ul>
        <ul>
          <p>Languages:</p>
          <p>{countries.languages.map((x) => x.name)}</p>
        </ul>
        <ul>
          <p>Weather:</p>
          {console.log(weather)}
          <img
            alt="flag-country"
            src={`http://openweathermap.org/img/wn/${weather[0] ? weather[0].icon : '' }@2x.png`}
          ></img>
          <p>{weather[0] ? weather[0].main : ''}</p>
          <p>{weather[0] ? weather[0].description : ''}</p>
        </ul>
      </div>
    );
  }
};

export default Countries;
