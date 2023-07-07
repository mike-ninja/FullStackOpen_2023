import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login(state, action) {
      const user = action.payload;
      return user;
    },
    logout(state, action) {
      return null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const userLogin = (user) => {
  return (dispatch) => {
    dispatch(login(user));
  };
};

export const userLogout = () => {
  return (dispatch) => {
    dispatch(logout());
  };
};

export default userSlice.reducer;
