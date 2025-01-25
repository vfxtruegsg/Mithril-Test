import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getTodayWeather } from "./weatherOperations";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTodayWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      })

      .addMatcher(isAnyOf(getTodayWeather.pending), (state) => {
        state.isLoading = true;
        state.isError = false;
      })

      .addMatcher(isAnyOf(getTodayWeather.rejected), (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const selectData = (state) => state.weather.data;
export const selectIsLoading = (state) => state.weather.isLoading;
export const selectisError = (state) => state.weather.isError;

export default weatherSlice.reducer;
