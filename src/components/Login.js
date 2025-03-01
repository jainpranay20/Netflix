import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValideData } from '../utils/validate';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { IMG_BACKGROUND, USER_AVATAR } from '../utils/constants';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isSignInForm, setIsSignInForm] = useState(true);
    const dispatch = useDispatch(); // for managing the states
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const handleButtonClick = () => {
        const message = checkValideData(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message) return;
        if (!isSignInForm) {
            // Sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: USER_AVATAR
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = user;
                        dispatch(addUser({
                            uid: uid,
                            email: email,
                            displayName: displayName,
                            photoURL: photoURL
                        }));
                    }).catch((error) => {
                        setErrorMessage(error.message);
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);

                });
        }

    }

    const toggleSignInForm = () => {
        setIsSignInForm((prev) => !prev);
    }
    return (
        <div>
            <Header />
            <div className='absolute'>
                <img src={IMG_BACKGROUND} alt="logo"
                />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
                <h1 className='font-bold text-xl'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                <input
                    type="text"
                    placeholder='Email address'
                    className='p-4 my-4 w-full bg-gray-800'
                    ref={email}
                />
                {!isSignInForm && (
                    <input
                        type="name"
                        placeholder='Name'
                        className='p-4 my-4 w-full bg-gray-800'
                        ref={name}
                    />)}

                <input
                    type="password"
                    placeholder='Password'
                    className='p-4 my-4 w-full bg-gray-800'
                    ref={password}
                />
                <p className='text-red-500'>{errorMessage}</p>
                <button className='p-4 my-6 bg-red-700 rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className='py-6 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to netflix? Sign up Now" : "Already registered? Sign in now"}</p>
            </form>
        </div>
    )
}

export default Login