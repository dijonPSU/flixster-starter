import React, { useState } from "react";
import Modal from "./Modal";
import ReactDOM from "react-dom";

export default function MovieCard({ movie }) {
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
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <h3>{movie.original_title}</h3>
          <div className="movie-info-p">
            <p>Release date: {movie.release_date}</p>
            <p>{movie.vote_average}</p>
          </div>
        </div>
      </div>
      {isModalOpen &&
        ReactDOM.createPortal(
          <Modal movie={movie} onClose={handleCloseModal} />,
          document.body
        )
      }
    </>
  );
}
