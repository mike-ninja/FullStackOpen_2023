import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    user: userReducer,
    notification: notificationReducer,
  },
});

export default store;
