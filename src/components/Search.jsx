import React from 'react';

function Search({ city, setCity, handleSearch }) {
  return (
    <div className="search">
      <input
        type="text"
        value={city}
        onKeyDown={handleSearch}
        onChange={(event) => setCity(event.target.value.toUpperCase())}
        placeholder="Search Location"
      />
    </div>
  );
}

export default Search;
