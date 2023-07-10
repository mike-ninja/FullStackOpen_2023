import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { userLogin } from "./reducers/userReducer";
import { Route, Routes } from "react-router-dom";

import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import User from "./components/User";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Menu from "./components/Menu";
import { initialComments } from "./reducers/commentReducer";
import { setNotification } from "./reducers/notificationReducer";
import { userLogout } from "./reducers/userReducer";
import { Button } from "react-bootstrap";

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
    dispatch(initialComments());
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
      <div className="container">
        <h2>Log in to the application</h2>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="container">
      <Menu />
      <div>
        <span>
          {loggedUser.name} logged in
        </span>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <Notification />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default App;
