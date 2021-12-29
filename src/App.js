import React from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetchMoviesHandler = React.useCallback(async()=>{ 
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  },[]);

  React.useEffect(()=>{
    fetchMoviesHandler();
  },[fetchMoviesHandler]);

  let displayContent = <p>No Movies Found</p>;
  if (movies.length > 0) {
    displayContent = <MoviesList movies={movies} />;
  }
  if (error) {
    displayContent = <p>Something went wrong!</p>;
  }
  if (isLoading) {
    displayContent = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{displayContent}</section>
    </React.Fragment>
  );
}

export default App;
