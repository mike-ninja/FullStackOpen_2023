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
      <Menu loggedUser={loggedUser}/>
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
