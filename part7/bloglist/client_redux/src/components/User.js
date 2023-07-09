import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const User = () => {
  const { id } = useParams();
  const user = useSelector(({ users }) => {
    return users.filter(user => user.id === id)[0]
  });

  if (!user)
    return null
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
