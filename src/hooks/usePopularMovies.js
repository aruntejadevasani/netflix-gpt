import { useEffect } from 'react';
import { apiOptions } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addPopularMovies } from '../utils/movieSlice';

const usePopularMovies = () => {
	const dispatch = useDispatch();

	const popularMovies = useSelector((store) => store.movies.popularMovies);

	const getPopularMovies = async () => {
		const data = await fetch(
			'https://api.themoviedb.org/3/movie/popular?page=1',
			apiOptions
		);
		const json = await data.json();
		dispatch(addPopularMovies(json.results));
	};

	useEffect(() => {
		!popularMovies && getPopularMovies();
	}, []);
};

export default usePopularMovies;
