

import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const usePopularMovies = () => {

  const dispatch = useDispatch();

  // memoization
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  // fetch data from TMDB API and update store by using hook usePopularMovies
  const getPopularMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);
    const json = await data.json();
    // console.log(json.results);
    dispatch(addPopularMovies(json.results))
  };

  useEffect(() => {
    // memoization
    !popularMovies && getPopularMovies();
  }, [])

}

export default usePopularMovies;