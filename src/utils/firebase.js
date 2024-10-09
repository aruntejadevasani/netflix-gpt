// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDyfd0pwto9ZlQ0WVdJK6qMfxMgEg1ECY0',
	authDomain: 'netflixgpt-4c552.firebaseapp.com',
	projectId: 'netflixgpt-4c552',
	storageBucket: 'netflixgpt-4c552.appspot.com',
	messagingSenderId: '992717797781',
	appId: '1:992717797781:web:87e394b05455f882f95e9c',
	measurementId: 'G-J4GER54HCS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
