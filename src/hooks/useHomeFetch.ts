import { useState, useEffect } from "react";
//API
import API, { Movie } from '../API';
//helpers
import { isPersistedState } from "../helpers";

const initialState = {
  page: 0,
  results: [] as Movie[],
  total_pages: 0,
  total_results: 0,
};

export const useHomeFetch = () => {
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ state, setState ] = useState(initialState);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isError, setIsError ] = useState(false);
  const [ isLoadingMore, setIsLoadingMore ] = useState(false);

  const fetchMovies = async (page: number, searchTerm = '') => {
    try {
      setIsError(false);
      setIsLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);
      console.log(movies);

      setState(prev => ({
        ...movies,
        results:
          page > 1 ? [ ...prev.results, ...movies.results ] : [ ...movies.results ]
      }));

    } catch (error) {
      setIsError(true);
    };
    setIsLoading(false);
  };

  // initial and search
  useEffect(() => {
    if (!searchTerm) {
      const sessionState = isPersistedState('homeState');

      if (sessionState) {
        setState(sessionState);
        return;
      };
    };

    setState(initialState);
    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  // Load more
  useEffect(() => {
    if (!isLoadingMore) return;

    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page]);

  //write to sessionStorage
  useEffect(() => {
    if (!searchTerm) sessionStorage.setItem('homeState', JSON.stringify(state));
  }, [searchTerm, state])

  return {
    state,
    isLoading,
    isError,
    searchTerm,
    setSearchTerm,
    setIsLoadingMore
  }; // es6 syntax
};
