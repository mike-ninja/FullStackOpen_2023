import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { userLogin, userLogout } from "./reducers/userReducer";
import {
  Route,
  Routes,
  useMatch,
} from 'react-router-dom'

import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import User from "./components/User";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";

const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(({ user }) => user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(userLogin(user));
      blogService.setToken(user.token);
    }
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem(
        "loggedBlogAppUser",
      );
      blogService.setToken(null);
      dispatch(userLogout());
    } catch (exception) {
      dispatch(setNotification("Encountered an error", 3));
    }
  };

  if (loggedUser === null) {
    return (
      <div>
        <h2>Log in to the application</h2>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>{loggedUser.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
