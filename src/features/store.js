//defining our store
import { configureStore } from "@reduxjs/toolkit";

//import reducer from slices
import moviesReducer from "./movies/movieSlice";

//invoke the func and assign it to a store variable
const store = configureStore({
  //here we define all our reducers from slices
  reducer: {
    movies: moviesReducer, //nameofslice: nameofReducer
  },
});

//export store
export default store;
