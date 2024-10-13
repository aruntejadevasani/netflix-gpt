import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_IMAGE } from '../utils/constants';

const GptSearch = () => {
	return (
		<>
			<div className="fixed -z-10">
				<img
					className="h-screen md:h-auto object-cover md:w-screen"
					src={BG_IMAGE}
					alt="logo"
				/>
			</div>
			<div>
				<GptSearchBar />
				<GptMovieSuggestions />
			</div>
		</>
	);
};

export default GptSearch;
