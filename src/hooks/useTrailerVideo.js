import { useEffect } from 'react';
import { apiOptions } from '../utils/constants';
import { addTrailerVideo } from '../utils/movieSlice';
import { useDispatch, useSelector } from 'react-redux';

const useTrailerVideo = (movieId) => {
	const dispatch = useDispatch();

	const trailerVideo = useSelector((store) => store.movies.trailerVideo);

	const getMovieVideo = async () => {
		const data = await fetch(
			'https://api.themoviedb.org/3/movie/' +
				movieId +
				'/videos?language=en-US',
			apiOptions
		);
		const json = await data.json();
		const filteredData = json.results.filter(
			(video) => video.type === 'Trailer'
		);
		const trailer = filteredData.length ? filteredData[0] : json.results[0];
		dispatch(addTrailerVideo(trailer));
	};

	useEffect(() => {
		!trailerVideo && getMovieVideo();
	}, []);
};

export default useTrailerVideo;
