import MovieList from './MovieList'
import Header from './Header'
import Footer from './Footer';
import './App.css'
import { useState, useEffect } from "react";



const App = () => {
  const [Data, setData] = useState([]);
  const [sData, setsData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);


  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    const savedWatchlist = localStorage.getItem('watchlist');

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);


  const toggleFavorite = (movie) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(favMovie => favMovie.id === movie.id);

      if (isAlreadyFavorite) {
        return prevFavorites.filter(favMovie => favMovie.id !== movie.id);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  const toggleWatchlist = (movie) => {
    setWatchlist(prevWatchlist => {
      const isAlreadyInWatchlist = prevWatchlist.some(watchMovie => watchMovie.id === movie.id);

      if (isAlreadyInWatchlist) {
        return prevWatchlist.filter(watchMovie => watchMovie.id !== movie.id);
      } else {
        return [...prevWatchlist, movie];
      }
    });
  };

  return (
    <div className="App">
      <Header setsData={setsData} current={Data} />
      <div className="content">
        <MovieList
          search={sData}
          data={Data}
          setData={setData}
          favorites={favorites}
          watchlist={watchlist}
          toggleFavorite={toggleFavorite}
          toggleWatchlist={toggleWatchlist}
        />
      </div>
      <Footer />
    </div>
  )
}



export default App
