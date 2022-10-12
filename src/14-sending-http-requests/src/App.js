import React, { useCallback, useEffect, useState } from 'react';
import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import axios from 'axios';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // const response = await axios.get('https://swapi.dev/api/films/');
      // const transformMovies = response.data.results.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date,
      //   };
      // });
      // setMovies(transformMovies);
      const response = await axios.get(
        'https://react-http-c4abb-default-rtdb.europe-west1.firebasedatabase.app/movies.json'
      );
      const loadedMovies = [];
      for (const key in response.data) {
        loadedMovies.push({
          id: key,
          title: response.data[key].title,
          openingText: response.data[key].openingText,
          releaseDate: response.data[key].releaseDate,
        });
      }
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const response = await axios.post(
      'https://react-http-c4abb-default-rtdb.europe-west1.firebasedatabase.app/movies.json',
      movie,
      config
    );
    console.log(response.data);
  }

  let content = <p>No Movies Found</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
