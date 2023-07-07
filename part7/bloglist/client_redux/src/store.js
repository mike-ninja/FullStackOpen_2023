import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
import usersReducer from "./reducers/usersReducer";

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer,
    notification: notificationReducer,
  },
});

export default store;
