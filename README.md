# My App Deployment  

**Live URL:** [Netflix App](https://netflix-666dd.web.app/)  

This application is deployed on **Firebase** and is live at the above URL. 
In the end of the readme i have shared some of the screenshot of my app. 

# Netflix GPT

- Create React App
- Configured Tailwind CSS
- Header
- Login Form
- Sign up Form
- Form Validation
- useRef Hook
- Firebase setup
- Deploying our app to production
- Creating signup user in firebase
- Implement sign in user API
- Created Redux store with user slice
- Implemented Sign out
- Update profile
- Fetch from TMDB Movies
- BugFix - If the user is not logged in Redirec/ browse to login page and vice-versa
- Unsubscribe to the onAuthStateChanged callback function
- Register TMDB API & create an app & get access token
- Get Data from TMDB now playing movies list API
- Created custom hooks
- Created store with movies data
- Maincontainer
- Fetch data for trailer video
- Update store with movies data
- Embedded the Youtube video and make it
- Secondary container
- Movie List * n
- cards * n
- GPT Search feature
- GPT Search bar
- Multi-language feature in our app
    

# Features 

- Login/Sign Up
    - Sign In/ Sign Up Form
    - redirect to Browse page

- Browse (after authentication)
    - Header
    - Main movie
        - Trailer in Background
        - Title & Description
        - Movie Suggestions 
            - Movie List * N

- Netflix GPT
    - Search Bar
    - Movie Suggestions


# commands or configuration 
- npm install -D tailwindcss@3
- npx tailwindcss init
- npm i -D react-router-dom
- https://stackoverflow.com/questions/76776910/unknown-at-rule-tailwind-cssunknownatrules-tailwind-error removing the tailwind error
-  Set-ExecutionPolicy Unrestricted -Scope CurrentUser [Win + X]
- npm install firebase
- firebase login
- firebase login --no-localhost
- firebase emulators:start
- npm install -g firebase-tools
- firebase init
- Hosting: Configure files for 
- Firebase Hosting and (optionally) set up GitHub Action deploys

- What do you want to use as your public directory? build
- Configure as a single-page app (rewrite all urls to /index.html)? No
- Set up automatic builds and deploys with GitHub? No

- npm run build
- firebase deploy

- npm i -D @reduxjs/toolkit
- npm i react-redux
- npm install openai

# Below are the screenshot of my app

![Starting Page](firstpage.png)

![Sign in page](signin.png)

![signout page](signout.png)

![search feature](search.png)