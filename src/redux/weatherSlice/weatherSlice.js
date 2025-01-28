import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getTodayWeather, getHourlyWeather } from "./weatherOperations";

const initialState = {
  data: [],
  dataHourlyWeather: [],
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

      .addCase(getHourlyWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.dataHourlyWeather = action.payload;
      })

      .addMatcher(
        isAnyOf(getTodayWeather.pending, getHourlyWeather.pending),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )

      .addMatcher(
        isAnyOf(getTodayWeather.rejected, getHourlyWeather.rejected),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});

export const selectData = (state) => state.weather.data;
export const selectDaraHourlyWeather = (state) =>
  state.weather.dataHourlyWeather;
export const selectIsLoading = (state) => state.weather.isLoading;
export const selectisError = (state) => state.weather.isError;

export default weatherSlice.reducer;
