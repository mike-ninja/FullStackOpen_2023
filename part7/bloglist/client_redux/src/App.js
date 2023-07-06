import { useEffect, useRef } from "react";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";

import blogService from "./services/blogs";
import loginService from "./services/login";
import { useUserDispatch, useUserValue } from "./context/UserContext";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
// import { setToken } from "./request";

const App = () => {
  const dispatch = useDispatch();

  const userDispatch = useUserDispatch();
  const loggedUser = useUserValue();
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({
        type: "SET_USER",
        payload: user,
      });
      // setToken(user.token);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      console.log(username);
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(user),
      );
      blogService.setToken(user.token);
      console.log("user", user);
      userDispatch({
        type: "SET_USER",
        payload: user,
      });
    } catch (exception) {
      dispatch(setNotification("Wrong credentials", 3));
    }
  };

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem(
        "loggedBlogAppUser",
      );
      blogService.setToken(null);
      userDispatch({ type: "RESET" });
    } catch (exception) {
      dispatch(setNotification("Encountered an error", 3));
    }
  };

  const blogForm = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  );

  if (loggedUser === null) {
    return (
      <div>
        <h2>Log in to the application</h2>
        <Notification />
        <LoginForm handleSubmit={handleLogin} />
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

      {blogForm()}
      <Blogs />
    </div>
  );
};

export default App;
