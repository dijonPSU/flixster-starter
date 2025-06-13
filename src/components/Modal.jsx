import React, { useState, useEffect } from "react";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDYyZDQ0MzdiYTRkMmM1ZGU5Y2Y0MTMxNjEyY2YxNiIsIm5iZiI6MTc0OTUxMTAyMi4yNTcsInN1YiI6IjY4NDc2YjZlM2EyN2NjMmEwODMwMWM3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O9HwBRgheJd1PIbcn8DZwm-UimnGTta7-BlnOUIlzxs'
    }
};

export default function Modal({ movie, onClose }) {
    const [genres, setGenres] = useState([]);
    const [runtime, setRuntime] = useState(0);
    const [trailerURL, setTrailerURL] = useState("");
    const [trailerLoading, setTrailerLoading] = useState(true);
    const [trailerError, setTrailerError] = useState(false);

    const getGenre = async () => {
        try {
            let genreUrl = `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`;
            const response = await fetch(genreUrl, options);
            const data = await response.json();
            const runtime = data.runtime;
            setRuntime(runtime);
            setGenres(data.genres || []);
        } catch (error) {
            console.error("Error fetching genres: ", error);
        }
    };

    const getTrailer = async () => {
        setTrailerLoading(true);
        setTrailerError(false);
        try {
            let trailerUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`;
            const response = await fetch(trailerUrl, options);
            const trailerData = await response.json();

            const videos = trailerData.results || [];
            const trailer = videos.find(video =>
                video.site === "YouTube" &&
                (video.type === "Trailer" || video.type === "Teaser")
            );

            if (trailer && trailer.key) {
                setTrailerURL(`https://www.youtube.com/embed/${trailer.key}`);
            } else {
                setTrailerError(true);
            }
        } catch (error) {
            console.error("Error getting trailer: ", error);
            setTrailerError(true);
        } finally {
            setTrailerLoading(false);
        }
    }

    useEffect(() => {
        getGenre();
        getTrailer();
    }, [movie.id]);

    return (
        <div className="modal-overlay active">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{movie.original_title}</h2>
                    <button onClick={onClose} className="close-button">&times;</button>
                </div>
                <div className="modal-body">
                    <div className="modal-image">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="modal-poster"
                        />
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
                            <p><strong>Runtime:</strong> {runtime > 0 ? `${runtime} minutes` : "N/A"}</p>
                            <p><strong>Genre:</strong> {genres.length > 0 ? genres.map(genre => genre.name).join(', ') : 'N/A'}</p>
                            <p><strong>Rating:</strong> {movie.vote_average}</p>
                        </div>

                        <div className="movie-trailer">
                            <h3>Trailer</h3>
                            {trailerLoading ? (
                                <p>Loading trailer...</p>
                            ) : trailerError ? (
                                <p>No trailer available for this movie.</p>
                            ) : (
                                <div className="trailer-container">
                                    <iframe
                                        src={trailerURL}
                                        title={`${movie.original_title} Trailer`}
                                        style={{ border: 'none' }}
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
