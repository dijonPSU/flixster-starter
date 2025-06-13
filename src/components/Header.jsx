import React from "react";
import { useState } from "react";

const options = {
  method: 'GET',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDYyZDQ0MzdiYTRkMmM1ZGU5Y2Y0MTMxNjEyY2YxNiIsIm5iZiI6MTc0OTUxMTAyMi4yNTcsInN1YiI6IjY4NDc2YjZlM2EyN2NjMmEwODMwMWM3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O9HwBRgheJd1PIbcn8DZwm-UimnGTta7-BlnOUIlzxs'
  }
};

export default function Header({ setsData, current }) {
  const [search, setSearch] = useState("");

  const onSearch = (e) => {
    setSearch(e.target.value);
  }

  const onClear = () => {
    setSearch("");
    setsData([]);
  }

  const sortData = (e) => {
    e.preventDefault();
    let sortedResults = [];
    let sortCriteria = e.target.value;

    if (sortCriteria === "A-Z") {
      sortedResults = [...current.results].sort((a, b) => a.original_title.localeCompare(b.original_title));
    } else if (sortCriteria === "Release Date") {
      sortedResults = [...current.results].sort((a, b) => a.release_date.localeCompare(b.release_date));
    } else if (sortCriteria === "Vote average") {
      sortedResults = [...current.results].sort((a, b) => b.vote_average - a.vote_average);
    } else {
      sortedResults = current.results;
      sortCriteria = null;
    }
    setsData({ ...current, results: sortedResults, sortCriteria: sortCriteria });
  };


  const onSubmit = (e) => {
    e.preventDefault();
    const searchQuery = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}`, options);
        const jsonData = await response.json();
        setsData(jsonData);
      } catch (err) {
        console.error(err);
      }
    }
    searchQuery();
  }


  return (
    <header className="App-header">
      <div className="header-title">
        <h1>Flixster</h1>
      </div>
      <div className="search-bar">
        <input
          onChange={onSearch}
          value={search}
          className="header-searchbar"
          placeholder="Enter Movie Title here"
          type="text"
        />
        <button onClick={onSubmit} className="header-searchbutton">Submit</button>
        <button onClick={onClear} className="header-clearbutton">Clear</button>
      </div>
      <div className="sort">
        <select onChange={sortData}>
          <option value="" selected disabled>Sort By</option>
          <option>A-Z</option>
          <option>Release Date</option>
          <option>Vote average</option>
        </select>
      </div>
    </header>
  );
}
