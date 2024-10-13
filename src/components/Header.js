import React, { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleGptSearchView } from '../utils/gptSlice';
import { NETFLIX_LOGO, SUPPORTED_LANG } from '../utils/constants';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
	const navigate = useNavigate();
	const user = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const { uid, email, displayName, photoURL } = user;
				dispatch(
					addUser({
						uid: uid,
						email: email,
						displayName: displayName,
						photoURL: photoURL,
					})
				);
				navigate('/browse');
			} else {
				dispatch(removeUser());
				navigate('/');
			}
		});

		//Unsubscribe when component unmounts
		return () => unsubscribe();
	}, []);

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {})
			.catch((error) => {
				navigate('/error');
			});
	};

	const handleGptSearchClick = () => {
		dispatch(toggleGptSearchView());
	};

	const handleLanguageChange = (e) => {
		dispatch(changeLanguage(e.target.value));
	};

	return (
		<div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex flex-col md:flex-row justify-between">
			<img
				className="w-44 mx-auto md:mx-0"
				src={NETFLIX_LOGO}
				alt="logo"
			/>
			{user && (
				<div className="flex">
					{showGptSearch && (
						<select
							className="p-2 m-2 bg-gray-900 text-white border border-white rounded-lg"
							onChange={handleLanguageChange}
						>
							{SUPPORTED_LANG.map((lang) => (
								<option
									key={lang.indentifier}
									value={lang.indentifier}
								>
									{lang.name}
								</option>
							))}
						</select>
					)}
					<button
						className="py-2 px-4 my-2 mx-4 bg-purple-500 text-white rounded-lg"
						onClick={handleGptSearchClick}
					>
						{showGptSearch ? 'Home Page' : 'GPT Search'}
					</button>
					<img
						className="w-12 h-12 m-auto"
						src={user.photoURL}
						alt="icon"
					/>
					<div className="font-bold text-white m-auto px-2">
						{user?.displayName}
					</div>
					<button
						className="font-bold text-white"
						onClick={handleSignOut}
					>
						Sign Out
					</button>
				</div>
			)}
		</div>
	);
};

export default Header;
