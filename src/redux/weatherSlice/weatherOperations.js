import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "58593017baceb7337dd3aaf454e295e3";

export const getTodayWeather = createAsyncThunk(
  "weather/getTodayWeather",
  async (cityName, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `/weather?q=${cityName}&appid=${API_KEY}`
      );
      return [data];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
