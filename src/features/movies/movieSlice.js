//import createSlice func
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/api/movieApi";
import { APIKEY } from "../../common/api/apiKey";

// console.log(process.env.REACT_APP_API_KEY); //apikey

//generates pending, fulfilled, and rejected action types
export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (searchText) => {
    const response = await movieApi.get(
      `?apiKey=${APIKEY}&s=${searchText}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (searchText) => {
    const response = await movieApi.get(
      `?apiKey=${APIKEY}&s=${searchText}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKEY}&i=${id}&Plot=full`);
    return response.data;
  }
);

//initialState
const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
};

//invoke the func and assign the returned value to a const
//createSlice takes an object with 3 properties
const movieSlice = createSlice({
  name: "movies", //name of slice
  initialState: initialState,
  reducers: {
    //actions
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      // console.log("Pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, action) => {
      // console.log("Fetched successfully");
      return { ...state, movies: action.payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      // console.log("Rejected");
    },
    [fetchAsyncShows.fulfilled]: (state, action) => {
      // console.log("Fetched successfully");
      return { ...state, shows: action.payload };
    },
    [fetchAsyncMovieOrShowDetail.fulfilled]: (state, action) => {
      // console.log("Fetched successfully");
      return { ...state, selectMovieOrShow: action.payload };
    },
  },
});

//export reducer
export default movieSlice.reducer;

//export actions
export const { removeSelectedMovieOrShow } = movieSlice.actions;

export const getAllMovies = (state) => state.movies.movies;
//state.nameofslice.nameofpropertyofinitialState
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
