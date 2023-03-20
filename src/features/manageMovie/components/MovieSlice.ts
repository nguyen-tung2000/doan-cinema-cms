import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getMovieAll, deleteMovie } from "./../api/api";

// import { movieList } from './';
const initialState = {
  list: [],
  isLoading: false,
};

export const getMovieList = createAsyncThunk("getMovieList", async (data: string, thunkAPI) => {
  try {
    const res = await getMovieAll(data);
    return res.values;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const DeleteMovie = createAsyncThunk("delete Movie", async (data: string, thunkAPI) => {
  try {
    const res = await deleteMovie(data);
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const movie = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: {
    [getMovieList.rejected as any]: (state) => {
      state.isLoading = true;
    },
    [getMovieList.pending as any]: (state) => {
      state.isLoading = false;
    },
    [getMovieList.fulfilled as any]: (state, action) => {
      state.list = action.payload;
      state.isLoading = true;
    },
  },
});

export const movieReducer = movie.reducer;
