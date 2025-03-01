import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice'
import { useDispatch } from 'react-redux'
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
    const dispatch = useDispatch(); // for managing the states
    const navigate = useNavigate();
    const user = useSelector(store => store.user);
    const showGptsearch = useSelector(store => store.gpt?.showGptSearch);
    console.log('show gpt search', showGptsearch)
    const handleSignout = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
            navigate("/error");
        });
    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL
                }));
                navigate("/browse")
            } else {
                dispatch(removeUser());
                navigate("/")
            }
        });
        return () => unsubscribe();
    }, [])

    const handleGptSearchClick = () => {
        // Toggle GPT Search button
        dispatch(toggleGptSearchView()); // have not passed anything as we are not passing any actions 
    }

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    }
    return (
        <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
            <img
                className='w-44'
                src={LOGO}
                alt="hello"
            />
            {user && (
                <div className='flex'>
                    {showGptsearch && (
                        <select className='p-2 bg-gray-900 text-white m-2' onChange={handleLanguageChange}>
                            {SUPPORTED_LANGUAGES.map((lang) => (
                                <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
                            ))}
                        </select>
                    )}

                    <button
                     className='py-2 px-4 m-2 bg-purple-800 text-white rounded-lg'
                      onClick={handleGptSearchClick}>
                        {showGptsearch? "Homepage":"GPT Search"}
                        </button>
                    <div style={{ width: "2rem", paddingTop: "1.4rem" }}>
                        <img
                            alt="usericon"
                            src={user?.photoURL}
                        />
                    </div>
                    <button onClick={handleSignout} className='text-white px-4'>Sign out</button>
                </div>)}
        </div>
    )
}

export default Header