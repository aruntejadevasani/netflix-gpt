import { useEffect } from 'react';
import { apiOptions } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addTopRatedMovies } from '../utils/movieSlice';

const useTopRatedMovies = () => {
	const dispatch = useDispatch();

	const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

	const getPopularMovies = async () => {
		const data = await fetch(
			'https://api.themoviedb.org/3/movie/top_rated?page=1',
			apiOptions
		);
		const json = await data.json();
		dispatch(addTopRatedMovies(json.results));
	};

	useEffect(() => {
		!topRatedMovies && getPopularMovies();
	}, []);
};

export default useTopRatedMovies;
