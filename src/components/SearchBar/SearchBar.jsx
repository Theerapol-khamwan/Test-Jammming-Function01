import React, { useState } from "react";
import style from "./SearchBar.module.css";

const DAMMY_SEARCH = { term: "" };

const SearchBar = (props) => {
  const { onSearch } = props;

  const [addSearch, setAddSearch] = useState('');

  const handleTermChange = (event) => {
    setAddSearch(event.target.value);
  };

  const search = () => {
    onSearch(addSearch);
  };

  return (
    <div className={style.SearchBar}>
      <input
        placeholder="Enter A Song, Album, or Artist"
        onChange={handleTermChange}
      />
      <button className={style.SearchButton} onClick={search}>
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;
