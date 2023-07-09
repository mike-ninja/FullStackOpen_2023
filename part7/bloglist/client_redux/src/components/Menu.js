import { Link } from "react-router-dom";
import { userLogout } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";

const Menu = ({ loggedUser }) => {
  const dispatch = useDispatch();
  const padding = {
    paddingRight: 5,
  };

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

  return (
    <div style={{backgroundColor: "gray", paddingTop: 5, paddingBottom: 5}}>
      <Link style={padding} to="/">Blogs</Link>
      <Link style={padding} to="/users">Users</Link>
      <span style={padding}>{loggedUser.name} logged in</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Menu;
