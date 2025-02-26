import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValideData } from '../utils/validate';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null);

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
                    console.log(user)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        } else {
            signInWithEmailAndPassword(auth,  email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user)
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
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/0cf2c109-3af1-4a9d-87d7-aecfac5fe881/web/IN-en-20250217-TRIFECTA-perspective_c3376e06-9aff-4657-aafb-91256a597b7c_small.jpg"
                    alt="logo"
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