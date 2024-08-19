import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill
} from "react-icons/bs"

import './Movie.css'
import MovieCard from "../components/MovieCard/MovieCard";
import Button from "../components/Button-Watch/Button";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;


const Movie = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data);
  }

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?${apiKey}`;
    getMovie(movieUrl);
  }, [])

  return (
    <div className="movie-page">
      
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill /> Descrição:
            </h3>
            <p>{movie.overview}</p>
          </div>
          <div className="info">
            <h2>
              <BsHourglassSplit /> Duração:
            </h2>
            <p>{movie.runtime} minutos</p>
          </div>
          <div className="info">
            <h2>
              <BsGraphUp /> Receita:
            </h2>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>
          <Button />
        </>
      )}
    </div>
  )
};

export default Movie