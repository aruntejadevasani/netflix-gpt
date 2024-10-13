import React, { useRef } from 'react';
import lang from '../utils/LanguageConstants';
import { useDispatch, useSelector } from 'react-redux';
import openai from '../utils/openai';
import { apiOptions } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
	const language = useSelector((store) => store.config.lang);
	const searchText = useRef(null);
	const dispatch = useDispatch();

	const searchMovieTMDB = async (movieName) => {
		const data = await fetch(
			'https://api.themoviedb.org/3/search/movie?query=' +
				movieName +
				'&include_adult=false&language=en-US&page=1',
			apiOptions
		);
		const json = await data.json();

		return json.results;
	};

	const handleGptSearchClick = async () => {
		const gptQuery =
			'Act as a movie recommendatio system and suggest some movies for the query: ' +
			searchText.current.value +
			'. Only give me names of 5 movies, comma seperated as given example. Example: Abc, Def, Ghi, Jkl, Mno';

		const gptResults = await openai.chat.completions.create({
			messages: [{ role: 'user', content: gptQuery }],
			model: 'gpt-3.5-turbo',
		});

		const gptMovies =
			gptResults?.choices?.[0]?.message?.content?.split(',');
		console.log(gptMovies);

		const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

		const tmbdResults = await Promise.all(promiseArray);
		console.log(tmbdResults);

		dispatch(
			addGptMovieResult({
				movieNames: gptMovies,
				movieResults: tmbdResults,
			})
		);
	};

	return (
		<div className="pt-[10%] flex justify-center">
			<form
				className="bg-black w-1/2 grid grid-cols-12"
				onSubmit={(e) => e.preventDefault()}
			>
				<input
					type="text"
					className="p-4 m-4 col-span-9"
					placeholder={lang[language].gptSearchPlaceHolder}
					ref={searchText}
				/>
				<button
					className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3"
					onClick={handleGptSearchClick}
				>
					{lang[language].search}
				</button>
			</form>
		</div>
	);
};

export default GptSearchBar;
