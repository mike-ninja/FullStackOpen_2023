import { ListGroup } from "react-bootstrap";
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
      <ListGroup>
        {user.blogs.map((blog) => <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>)}
      </ListGroup>
    </div>
  );
};

export default User;
