import React from "react";
import { useState, useEffect } from "react";


export default function Header() {
  return (
    <div className="App-header">
        <header>
            <h1>Flixster</h1>
            <div className="search-bar">
            <input className="header-searchbar" placeholder="Enter Movie Title here" type="Enter here" />
            <button className="header-searchbutton">Submit</button>
            </div>
        </header>


    </div>
  );
}
