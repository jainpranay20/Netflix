import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice'
import { useDispatch } from 'react-redux'
import { LOGO } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';

const Header = () => {
    const dispatch = useDispatch(); // for managing the states
    const navigate = useNavigate();
    const user = useSelector(store => store.user);
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
    return (
        <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
            <img
                className='w-44'
                src={LOGO}
                alt="hello"
            />
            {user && (
                <div className='flex'>
                    <button className='py-2 px-4 m-2 bg-purple-800 text-white rounded-lg' onClick={handleGptSearchClick}>GPT Search</button>
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