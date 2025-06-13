import React, { useState } from "react";
import Modal from "./Modal";
import ReactDOM from "react-dom";

export default function MovieCard({ movie, isFavorite, isInWatchlist, toggleFavorite, toggleWatchlist }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={handleCardClick} className="movie-card">
        <div className="movie-info">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
          <h2>{movie.original_title}</h2>
          <div className="movie-info-p">
            <p>Release date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
          </div>
          <div className="buttons-c">
            <button className={`button-f ${isFavorite ? 'active' : ''}`} onClick={(e) => {e.stopPropagation(); toggleFavorite(movie);}}>{isFavorite ? 'Unfavorite' : 'Favorite'}</button>
            <button className={`button-w ${isInWatchlist ? 'active' : ''}`} onClick={(e) => {e.stopPropagation();toggleWatchlist(movie);}}>{isInWatchlist ? 'Remove from Watchlist' : 'Watchlist'}</button>
          </div>
        </div>
      </div>
      {isModalOpen &&
        ReactDOM.createPortal(<Modal movie={movie} onClose={handleCloseModal}/>,
        document.body)
      }
    </>
  );
}
