import React from 'react'
import Header from './Header'

const Login = () => {
    return (
        <div>
            <Header />
            <div className='absolute'>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/0cf2c109-3af1-4a9d-87d7-aecfac5fe881/web/IN-en-20250217-TRIFECTA-perspective_c3376e06-9aff-4657-aafb-91256a597b7c_small.jpg"
                    alt="logo"
                />
            </div>
            <form className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
                <h1 className='font-bold text-xl'>Sign in</h1>
                <input type="text" placeholder='Email address' className='p-4 my-4 w-full bg-gray-800' />
                <input type="password" placeholder='Password' className='p-4 my-4 w-full bg-gray-800' />
                <button className='p-4 my-6 bg-red-700 rounded-lg'>Sign In</button>
            </form>
        </div>
    )
}

export default Login