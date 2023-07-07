import { useState } from "react";
import { userLogin } from "../reducers/userReducer";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(user),
      );
      blogService.setToken(user.token);
      dispatch(userLogin(user));
    } catch (error) {
      console.log("incorrect");
    }
    setUsername(""); // May not be necessary
    setPassword(""); // May not be necessary
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  );
};

export default LoginForm;
