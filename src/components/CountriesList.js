import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import CountriesListEffect from "./CountriesListEffect";
// import CountriesData from "../CountriesData"; // hard fetching data

const CountriesList = ({ query }) => {
  const [CountriesData, setCountriesData] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data);
      });
  }, []);

  return (
    <>
      {!CountriesData.length ? (
        <CountriesListEffect />
      ) : (
        <div className='countries-container'>
          {CountriesData.filter((country) =>
            country.name.common.toLocaleLowerCase().includes(query) || country.region.toLocaleLowerCase().includes(query)
          ).map((country) => {
            // console.log("🚀 ~ array ~ country:", country)

            return (
              <CountryCard
                key={country.name.common}
                name={country.name.common}
                flag={country.flags.svg}
                population={country.population.toLocaleString()}
                region={country.region}
                capital={country.capital?.[0]} //optional chaning
                data={country}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default CountriesList;
