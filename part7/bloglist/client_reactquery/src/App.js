import { useEffect, useRef, useState } from "react";
import { useNotificationDispatch } from "./context/NotificationContext";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import { setToken } from "./request";

import blogService from "./services/blogs";
import loginService from "./services/login";
import Blogs from "./components/Blogs";

const App = () => {
  const dispatch = useNotificationDispatch();
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
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
      setUser(user);
    } catch (exception) {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: `Wrong credentials`,
      });
      setTimeout(() => {
        dispatch({ type: "RESET" });
      }, 5000);
    }
  };

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem(
        "loggedBlogAppUser",
      );
      blogService.setToken(null);
      setUser(null);
    } catch (exception) {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: `Encountere an error. Try again`,
      });
      setTimeout(() => {
        dispatch({ type: "RESET" });
      }, 5000);
    }
  };

  const blogForm = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  );

  if (user === null) {
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
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {blogForm()}
      <Blogs loggedUser={user} />
    </div>
  );
};

export default App;
