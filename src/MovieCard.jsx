import React from "react";

export default function MovieCard({movie}) {
  return (
    <div className="movie-card">
      <div className="movie-info">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}alt={movie.title} />
        <h3>{movie.original_title}</h3>
        <div className="movie-info-p">
          <p>Release date: {movie.release_date}</p>
          <p>{movie.vote_average}</p>
        </div>
      </div>
    </div>
  );
}
