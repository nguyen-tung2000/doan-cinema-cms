import { configureStore } from "@reduxjs/toolkit";

import { movieReducer } from "@/features/manageMovie";
// eslint-disable-next-line no-restricted-imports

const rootReducer = {
  movie: movieReducer,
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
