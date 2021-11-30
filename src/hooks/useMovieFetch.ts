import { useState, useEffect } from "react";
import API, { Movie, Cast, Crew } from '../API';
//helpers
import { isPersistedState } from "../helpers";
//Types
export type MovieState = Movie & { actors: Cast[], directors: Crew[] };

export const useMovieFetch = (movieId: string) => {
  const [ state, setState ] = useState<MovieState>({} as MovieState);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);

        const movie = await API.fetchMovie(movieId);
        const credits = await API.fetchCredits(movieId);
        // get directors only
        const directors = credits.crew.filter(
          member => member.job === 'Director'
        );

        setState({
          ...movie,
          actors: credits.cast,
          directors // directors: directors
        });

        setLoading(false);

      } catch (error) {
        setError(true);
      };
    };

    const sessionState = isPersistedState(movieId);

    if (sessionState) {
      setState(sessionState);
      setLoading(false);
      return;
    }

    fetchMovie();
  }, [movieId]);

  // write to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(movieId, JSON.stringify(state));
  }, [movieId, state]);

  return { state, loading, error };
};
