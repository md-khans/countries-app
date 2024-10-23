import React, { useContext, useState } from "react";
import SearchBar from "./SearchBar";
import SelectMenu from "./SelectMenu";
import CountriesList from "./CountriesList";
import { themecontext } from "../contexts/ThemeContext";

const Home = () => {

    const [query, setQuery] = useState("")
    const [isdark] = useContext(themecontext)
    
  return (
    <>
      <main className={`${isdark ? "dark" : ""}`}>
        <div className='search-filter-container '>
          <SearchBar setQuery={setQuery} />
          <SelectMenu setQuery={setQuery} />
        </div>
        <CountriesList query={query} />
      </main>
    </>
  );
};

export default Home;
