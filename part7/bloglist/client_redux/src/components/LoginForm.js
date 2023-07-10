import { useState } from "react";
import { userLogin } from "../reducers/userReducer";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";

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
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          onChange={({target}) => setUsername(target.value)}
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        login
      </Button>
    </Form>
  );
};

export default LoginForm;
