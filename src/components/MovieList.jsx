import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDYyZDQ0MzdiYTRkMmM1ZGU5Y2Y0MTMxNjEyY2YxNiIsIm5iZiI6MTc0OTUxMTAyMi4yNTcsInN1YiI6IjY4NDc2YjZlM2EyN2NjMmEwODMwMWM3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O9HwBRgheJd1PIbcn8DZwm-UimnGTta7-BlnOUIlzxs'
  }
};


export default function MovieList({ search, data, setData }) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (pageNum) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNum}`, options);
      const jsonData = await response.json();

      if (pageNum === 1) {
        setData(jsonData);
      } else {
        setData(prevData => ({
          ...jsonData,
          results: [...(prevData.results || []), ...jsonData.results]
        }));
      }
    } catch (error) {
      console.log("Here is error " + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!search || !search.results) {
      fetchMovies(1);
    }
  }, [search, setData]);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    setLoading(true);
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${nextPage}`, options);
      const jsonData = await response.json();

      const updatedData = {...data, results: [...(data.results || []), ...jsonData.results]};
      setData(updatedData);

      if (search && search.sortCriteria) {
        let allSortedResults = [...updatedData.results];

        if (search.sortCriteria === "A-Z") {
          allSortedResults.sort((a, b) => a.original_title.localeCompare(b.original_title));
        } else if (search.sortCriteria === "Release Date") {
          allSortedResults.sort((a, b) => a.release_date.localeCompare(b.release_date));
        } else if (search.sortCriteria === "Vote average") {
          allSortedResults.sort((a, b) => b.vote_average - a.vote_average);
        }

        search.results = allSortedResults;
      }
    } catch (error) {
      console.log("Error is here: " + error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div>
      <div className="movie-container">
        {search.results && search.results.length > 0 ? (
          search.results.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })
        ) : (
          data && data.results && data.results.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })
        )}
      </div>

      {data && data.results && (
        <div className="load-more-container">
          <button
            onClick={handleLoadMore}
            className="load-more-button"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More Movies"}
          </button>
        </div>
      )}
    </div>
  );
}
