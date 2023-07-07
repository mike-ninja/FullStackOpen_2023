import { useParams } from "react-router-dom";
import usersService from "../services/users";

const User = async () => {
  const { id } = useParams();
  const user = await usersService.getUser(id);

  console.log(user);
  return (
    <div>
      <h2>User</h2>
      <h3>{user.name}</h3>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  );
};

export default User;
