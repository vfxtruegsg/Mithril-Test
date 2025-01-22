import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  password: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
