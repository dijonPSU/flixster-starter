import React from "react";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDYyZDQ0MzdiYTRkMmM1ZGU5Y2Y0MTMxNjEyY2YxNiIsIm5iZiI6MTc0OTUxMTAyMi4yNTcsInN1YiI6IjY4NDc2YjZlM2EyN2NjMmEwODMwMWM3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O9HwBRgheJd1PIbcn8DZwm-UimnGTta7-BlnOUIlzxs'
  }
};


export default function MovieList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const movies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${1}`, options);
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.log("Here is error " + error);
      }
    };
    movies();
  }, []);

  return (
    <div className="movie-container">
      {data.results && data.results.map((movie) => {
        return <MovieCard key={movie.id} movie={movie} />;
      })}
    </div>
  );
}
