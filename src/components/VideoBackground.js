import { useSelector } from 'react-redux';
import useTrailerVideo from '../hooks/useTrailerVideo';

const VideoBackground = ({ movieId }) => {
	useTrailerVideo(movieId);
	const trailer = useSelector((store) => store.movies?.trailerVideo);

	if (!trailer) return;
	return (
		<div className="">
			<iframe
				className="w-full aspect-video"
				src={
					'https://www.youtube.com/embed/' +
					trailer?.key +
					'?&autoplay=1&mute=1'
				}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerPolicy="strict-origin-when-cross-origin"
			></iframe>
		</div>
	);
};

export default VideoBackground;
