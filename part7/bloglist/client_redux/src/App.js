import { useEffect, useRef } from "react";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";

import blogService from "./services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { userLogin, userLogout } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(({ user }) => user);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log(user);
      dispatch(userLogin(user));
      blogService.setToken(user.token);
    }
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
      {blogForm()}
      <Blogs />
    </div>
  );
};

export default App;
