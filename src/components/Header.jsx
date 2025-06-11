import React from "react";
import { useState } from "react";



const options = {
  method: 'GET',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDYyZDQ0MzdiYTRkMmM1ZGU5Y2Y0MTMxNjEyY2YxNiIsIm5iZiI6MTc0OTUxMTAyMi4yNTcsInN1YiI6IjY4NDc2YjZlM2EyN2NjMmEwODMwMWM3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O9HwBRgheJd1PIbcn8DZwm-UimnGTta7-BlnOUIlzxs'
  }
};

export default function Header({ setsData }) {
  const [search, setSearch] = useState("");

  const onSearch = (e) => {
    setSearch(e.target.value);
  }

  const onClear = () => {
    setSearch("");
    setsData([]);
  }

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
    <div className="App-header">
      <header>
        <h1>Flixster</h1>
        <div className="search-bar">
          <input onChange={onSearch} value={search} className="header-searchbar" placeholder="Enter Movie Title here" type="Enter here" />
          <button onClick={onSubmit} className="header-searchbutton">Submit</button>
          <button onClick={onClear} className="header-clearbutton">Clear</button>
        </div>
      </header>


    </div>
  );
}
