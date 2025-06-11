import React from "react";

export default function Modal({ movie, onClose }) {
    return (
        <div className="modal-overlay active">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{movie.original_title}</h2>
                    <button onClick={onClose} className="close-button">&times;</button>
                </div>
                <div className="modal-body">
                    <div className="modal-image">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ maxWidth: "200px", borderRadius: "8px", marginBottom: "15px" }}/>
                    </div>
                    <div className="modal-details">
                        {movie.overview && (
                            <div className="movie-overview">
                            <h3>Overview</h3>
                            <p>{movie.overview}</p>
                            </div>
                        )}
                        <div className="movie-stats">
                            <p><strong>Release Date:</strong> {movie.release_date}</p>
                            <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
                            {movie.vote_count && <p><strong>Vote Count:</strong> {movie.vote_count}</p>}
                            {movie.popularity && <p><strong>Popularity:</strong> {movie.popularity}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
