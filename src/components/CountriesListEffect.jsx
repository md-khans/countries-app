import React from "react";
import "./CountriesListEffect.css";

const CountriesListEffect = () => {
  return (
    <div className='countries-container'>
      {Array.from({ length: 100 }).map((el, i) => {
        return <div key={i} className='country-card card-effect'></div>;
      })}
    </div>
  );
};

export default CountriesListEffect;
