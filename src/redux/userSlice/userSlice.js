import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  password: "",
  id: "",
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logInOut(state, action) {
      return { ...action.payload };
    },
  },
});

export const { logInOut } = userSlice.actions;
export const selectName = (state) => state.auth.name;

export default userSlice.reducer;
