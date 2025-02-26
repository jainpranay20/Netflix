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