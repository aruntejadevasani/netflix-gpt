import { useEffect } from 'react';
import { apiOptions } from '../utils/constants';
import { addTrailerVideo } from '../utils/movieSlice';
import { useDispatch } from 'react-redux';

const useTrailerVideo = (movieId) => {
	const dispatch = useDispatch();

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
		getMovieVideo();
	}, []);
};

export default useTrailerVideo;
