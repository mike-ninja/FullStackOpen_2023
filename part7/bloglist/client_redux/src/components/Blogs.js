import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Blogs = () => {
  const blogFormRef = useRef();

  const blogs = useSelector(({ blogs }) => {
    return blogs
      .map((b) => b)
      .sort((a, b) => b.likes - a.likes);
  });

  const blogForm = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  );

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      {blogForm()}
      <h2>Blogs</h2>
      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} by {blog.author}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Blogs;
