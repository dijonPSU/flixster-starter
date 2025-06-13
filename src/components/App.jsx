import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MovieList from './MovieList';
import Header from './Header';
import Footer from './Footer';
import './App.css';

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [Data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  
  const toggleFavorite = (movie) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(favMovie => favMovie.id === movie.id);
      return isAlreadyFavorite ? prevFavorites.filter(favMovie => favMovie.id !== movie.id) : [...prevFavorites, movie];
    });
  };

  const toggleWatchlist = (movie) => {
    setWatchlist(prevWatchlist => {
      const isAlreadyInWatchlist = prevWatchlist.some(watchMovie => watchMovie.id === movie.id);
      return isAlreadyInWatchlist ? prevWatchlist.filter(watchMovie => watchMovie.id !== movie.id) : [...prevWatchlist, movie];
    });
  };

  return (
    <div className="App">
      <Header setsData={setSearchData} current={Data} />
      <div className="content-container">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <div className="main-content">
          <div className="content">
            {activePage === 'home' && (
              <MovieList search={searchData} data={Data} setData={setData} favorites={favorites} watchlist={watchlist} toggleFavorite={toggleFavorite} toggleWatchlist={toggleWatchlist} activePage={activePage}/>
            )}
            {activePage === 'favorites' && (
              <div>
                <h2>Favorites</h2>
                <MovieList search={{ results: favorites }} data={{ results: favorites }} setData={setData} favorites={favorites} watchlist={watchlist} toggleFavorite={toggleFavorite} toggleWatchlist={toggleWatchlist} activePage={activePage}/>
              </div>
            )}
            {activePage === 'watched' && (
              <div>
                <h2>Watched</h2>
                <MovieList search={{ results: watchlist }} data={{ results: watchlist }} setData={setData} favorites={favorites} watchlist={watchlist} toggleFavorite={toggleFavorite} toggleWatchlist={toggleWatchlist} activePage={activePag} />
              </div>
            )}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
