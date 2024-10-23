import React, { useContext, useEffect, useState } from "react";
import "./CountryDetail.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { themecontext } from "../contexts/ThemeContext";
import CountryDetailEffect from "./CountryDetailEffect";

const CountryDetail = () => {
  const [isdark] = useContext(themecontext);
  const back = useNavigate()
  // const countryName = new URLSearchParams(window.location.search).get("name");

  // const location = useLocation()
  const { state } = useLocation();

  const params = useParams();
  const countryName = params.Country; // this is dynamically url change

  const [countryData, setCountryData] = useState({});
  const [notFound, SetNotFound] = useState(false);

  
  function updateCountryData(data) {
    setCountryData({
      name: data.name.common || data.name,
      nativeName: Object.values(data.name.nativeName || {})[0]?.common,
      population: data.population,
      region: data.region,
      subRegion: data.subregion,
      capital: data.capital,
      flag: data.flags.svg,
      tld: data.tld,
      language: Object.values(data.languages || {}).join(", "),
      currency: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(", "),
      // borders : Object.values(data.borders)
      borders: [],
    });
    if (!data.borders) {
      data.borders = [];
    }
    Promise.all(
      data.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => borderCountry.name.common);
      })
    ).then((borders) => {
      setTimeout(() =>
        setCountryData((prevState) => ({ ...prevState, borders }))
      );
    });
  }

  useEffect(() => {
    if (state) {
      updateCountryData(state);
      return;
    }
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        updateCountryData(data);
        // setCountryData((prevstate) => ({...prevstate, borders: [...prevstate.borders, borderCountry.name.common]}))
      })
      .catch((err) => {
        console.log("hiii", err);
        SetNotFound(true);
      });
  }, [countryName]);

  if (notFound) {
    return <div>Country Not Found</div>;
  }
  if (!countryData.borders) {
    countryData.borders = [];
  }

  return (
    <main className={`${isdark ? "dark" : ""}`}>
      <div className='country-details-container'>
        <span
          className='back-button'
          onClick={() => (back(-1))}
        >
          <i className='fa-solid fa-arrow-left'></i>&nbsp; Back
        </span>
       
        {countryData === null ? (
          <CountryDetailEffect />
        ) : (
          <div className='country-details'>
            <img src={countryData.flag} alt={`${countryData.name} Flag `} />
            <div className='details-text-container'>
              <h1>{countryData.name}</h1>
              <div className='details-text'>
                <p>
                  <b>
                    Native Name : {countryData.nativeName || countryData.name}{" "}
                  </b>
                  <span className='native-name'></span>
                </p>
                <p>
                  <b>Population : {countryData.population} </b>
                  <span className='population'></span>
                </p>
                <p>
                  <b>Region : {countryData.region} </b>
                  <span className='region'></span>
                </p>
                <p>
                  <b>Sub Region : {countryData.subRegion} </b>
                  <span className='sub-region'></span>
                </p>
                <p>
                  <b>Capital : {countryData.capital?.join(", ")} </b>
                  <span className='capital'></span>
                </p>
                <p>
                  <b>Top Level Domain : {countryData.tld} </b>
                  <span className='top-level-domain'></span>
                </p>
                <p>
                  <b>Currencies : {countryData.currency} </b>
                  <span className='currencies'></span>
                </p>
                <p>
                  <b>Languages : {countryData.language} </b>
                  <span className='languages'></span>
                </p>
              </div>
              {countryData.borders.length !== 0 && (
                <div className='border-countries'>
                  <b>Border Countries: </b>&nbsp;
                  {countryData.borders.map((border) => (
                    <Link key={countryData.name} to={`/${border}`}>
                      {border}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CountryDetail;
