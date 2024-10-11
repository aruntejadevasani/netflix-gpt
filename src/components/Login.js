import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_IMAGE, PROFILE_LOGO } from '../utils/constants';

const Login = () => {
	const [isSignIn, setIsSignIn] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const dispatch = useDispatch();

	const email = useRef(null);
	const password = useRef(null);
	const name = useRef(null);

	const toggleSignInForm = () => {
		setIsSignIn(!isSignIn);
	};

	const handleButtonClick = () => {
		const message = checkValidData(
			email.current.value,
			password.current.value
		);
		setErrorMessage(message);
		if (message) return;

		if (!isSignIn) {
			createUserWithEmailAndPassword(
				auth,
				email.current.value,
				password.current.value
			)
				.then((userCredential) => {
					const user = userCredential.user;
					updateProfile(user, {
						displayName: name.current.value,
						photoURL: PROFILE_LOGO,
					})
						.then(() => {
							const { uid, email, displayName, photoURL } =
								auth.currentUser;
							dispatch(
								addUser({
									uid: uid,
									email: email,
									displayName: displayName,
									photoURL: photoURL,
								})
							);
						})
						.catch((error) => {
							setErrorMessage(error.message);
						});
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					setErrorMessage(errorCode + '-' + errorMessage);
				});
		} else {
			signInWithEmailAndPassword(
				auth,
				email.current.value,
				password.current.value
			)
				.then((userCredential) => {})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					setErrorMessage(errorCode + '-' + errorMessage);
				});
		}
	};

	return (
		<div>
			<Header />
			<div className="absolute">
				<img src={BG_IMAGE} alt="logo" />
			</div>
			<form
				onSubmit={(e) => e.preventDefault()}
				className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
			>
				<h1 className="font-bold text-3xl py-4">
					{isSignIn ? 'Sign In' : 'Sign Up'}
				</h1>
				{!isSignIn && (
					<input
						ref={name}
						type="text"
						placeholder="Full Name"
						className="p-4 my-4 w-full bg-gray-700 rounded-lg"
					/>
				)}
				<input
					ref={email}
					type="text"
					placeholder="Email Adress"
					className="p-4 my-4 w-full bg-gray-700 rounded-lg"
				/>

				<input
					ref={password}
					type="password"
					placeholder="Password"
					className="p-4 my-4 w-full bg-gray-700 rounded-lg"
				/>
				<p className="text-red-600 font-bold text-lg py-2">
					{errorMessage}
				</p>
				<button
					className="p-4 my-6 bg-red-700 w-full rounded-lg"
					onClick={handleButtonClick}
				>
					{isSignIn ? 'Sign In' : 'Sign Up'}
				</button>
				<p
					className="p-2 my-2 cursor-pointer"
					onClick={toggleSignInForm}
				>
					{isSignIn
						? 'New to Netflix? Sign up now'
						: 'Already Registered? Sign in now'}
				</p>
			</form>
		</div>
	);
};

export default Login;
