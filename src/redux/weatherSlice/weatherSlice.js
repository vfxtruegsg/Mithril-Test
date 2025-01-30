import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getTodayWeather,
  getHourlyWeather,
  getNightWeather,
} from "./weatherOperations";

const initialState = {
  data: [],
  dataHourlyWeather: [],
  dataNightWeather: [],
  selectedWeather: [],
  isLoading: false,
  isError: false,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    removeData: (state) => {
      state.data = null;
      state.dataHourlyWeather = null;
    },

    selectWeather: (state, action) => {
      if (!Array.isArray(state.selectedWeather)) {
        state.selectedWeather = [];
      }
      state.selectedWeather.push(action.payload);
    },

    removeSelectWeather: (state, action) => {
      state.selectedWeather = state.selectedWeather.filter(
        (item) => item.id !== action.payload
      );
    },
  },
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

      .addCase(getNightWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.dataNightWeather = action.payload;
      })

      .addMatcher(
        isAnyOf(
          getTodayWeather.pending,
          getHourlyWeather.pending,
          getNightWeather.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )

      .addMatcher(
        isAnyOf(
          getTodayWeather.rejected,
          getHourlyWeather.rejected,
          getNightWeather.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});

export const { removeData, selectWeather, removeSelectWeather } =
  weatherSlice.actions;

export const selectData = (state) => state.weather.data;
export const selectDaraHourlyWeather = (state) =>
  state.weather.dataHourlyWeather;
export const selectSelectedWeather = (state) => state.weather.selectedWeather;
export const selectIsLoading = (state) => state.weather.isLoading;
export const selectisError = (state) => state.weather.isError;

export default weatherSlice.reducer;
