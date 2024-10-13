import { useEffect } from 'react';
import { apiOptions } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUpcomingMovies } from '../utils/movieSlice';

const useUpcomingMovies = () => {
	const dispatch = useDispatch();

	const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

	const getPopularMovies = async () => {
		const data = await fetch(
			'https://api.themoviedb.org/3/movie/upcoming?page=1',
			apiOptions
		);
		const json = await data.json();
		dispatch(addUpcomingMovies(json.results));
	};

	useEffect(() => {
		!upcomingMovies && getPopularMovies();
	}, []);
};

export default useUpcomingMovies;
