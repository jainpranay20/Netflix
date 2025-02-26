## What is `configureStore`?  
`configureStore` is a function from Redux Toolkit that simplifies creating a Redux store by providing good defaults and built-in middleware like Redux Thunk.  

## Features  
- Automatically sets up the **Redux DevTools Extension**  
- Includes built-in middleware for **asynchronous logic** (Thunk)  
- Supports **multiple reducers** easily  
- Enforces **serializable state** by default

## What is `createSlice`?  
`createSlice` is a function from Redux Toolkit that simplifies creating a Redux slice, which includes **state**, **reducers**, and **actions** in a single place.  

## Features  
- Automatically generates **action creators**  
- Simplifies **reducer logic**  
- Supports **immutable state updates** using Immer  
- Reduces boilerplate compared to traditional Redux  

# Redux Toolkit Guide

## 1. Creating a Slice (configSlice.js)
A slice in Redux Toolkit represents a piece of state and the reducers (functions) to update that state.

### Explanation
- We use `createSlice()` to define a slice named `config`.
- The `initialState` contains:
  - `apiUrl`: Stores an API URL.
  - `theme`: Stores the current theme (light or dark).
  - `featureFlag`: A boolean flag for feature toggling.
- **Reducers (functions):**
  - `setApiUrl`: Updates the `apiUrl` value.
  - `toggleTheme`: Switches between light and dark themes.
  - `setFeatureFlag`: Enables/disables a feature flag.

### Code (configSlice.js)
```javascript
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiUrl: "https://api.example.com",
  theme: "light",
  featureFlag: true,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setApiUrl: (state, action) => {
      state.apiUrl = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setFeatureFlag: (state, action) => {
      state.featureFlag = action.payload;
    },
  },
});

// Exporting actions
export const { setApiUrl, toggleTheme, setFeatureFlag } = configSlice.actions;
export default configSlice.reducer;
```

## 2. Adding the Slice Reducer to the Store (store.js)
The store is the central location where Redux keeps track of all slices.

### Code (store.js)
```javascript
import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./configSlice";

export const store = configureStore({
  reducer: {
    config: configReducer,
  },
});
```

### Explanation
- We use `configureStore()` to create the Redux store.
- The `config` slice reducer (`configReducer`) is added to the store.
- Now, all components in our React app can access or modify the `config` state.

## 3. Accessing the State in a Component
To read data from the store, we use `useSelector()`.

### Code (MyComponent.js)
```javascript
import { useSelector } from "react-redux";

const MyComponent = () => {
  const apiUrl = useSelector((state) => state.config.apiUrl);
  return <p>API URL: {apiUrl}</p>;
};

export default MyComponent;
```

### Explanation
- `useSelector()` helps us select a specific part of the state.
- The component displays the current `apiUrl` from Redux.

## 4. Updating the State in a Component
To modify the state, we use `useDispatch()` and call actions like `setApiUrl()` and `toggleTheme()`.

### Code (UpdateConfig.js)
```javascript
import { useDispatch } from "react-redux";
import { setApiUrl, toggleTheme } from "./configSlice";

const UpdateConfig = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(setApiUrl("https://newapi.com"))}>
        Update API URL
      </button>
      <button onClick={() => dispatch(toggleTheme())}>
        Toggle Theme
      </button>
    </div>
  );
};

export default UpdateConfig;
```

### Explanation
- `useDispatch()` gets the Redux dispatch function.
- `dispatch(setApiUrl("https://newapi.com"))` updates the `apiUrl`.
- `dispatch(toggleTheme())` switches between light and dark.

## Summary
| Concept         | Function                                      |
|---------------|---------------------------------|
| `createSlice`  | Defines a slice with state & reducers. |
| `configureStore` | Creates a store with all slices. |
| `useSelector`  | Reads data from Redux store. |
| `useDispatch`  | Dispatches actions to modify state. |
