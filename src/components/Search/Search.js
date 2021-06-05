import React, { useState } from 'react';
import './Search.css';

function Search({filterSearchText, placeholder, filteredAssets, changeCurrentAsset}) {
  const [searchText, setSearchText] = useState("");

  const selectFilteredAsset = (fsa) => {
    changeCurrentAsset(fsa);
    setSearchText("");
    filterSearchText("");
  }

  const onSearchInputChange = (text) => {
    setSearchText(text);
    filterSearchText(text);
  }

  return (
    <div className = "search">
      <input type = "text" 
        placeholder = {placeholder}
        value = {searchText}
        onChange = {(e) => onSearchInputChange(e.target.value)}
      />
      <div className = "search__list">
        {
          filteredAssets?.map(((fsa, i) => i < 10 && <div key = {i} className = "search__list-row" 
            onClick = {() => selectFilteredAsset(fsa)}>
              <p className = "search__listitem">{fsa.symbol}</p>
              <p className = "search__listitem">{fsa.name}</p>
              <p className = "search__listitem">{fsa.exchange}</p>
          </div>))
        }
      </div>
    </div>
  );
}

export default Search;