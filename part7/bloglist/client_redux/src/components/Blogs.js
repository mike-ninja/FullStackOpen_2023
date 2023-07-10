import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { Link } from "react-router-dom";

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
      {blogs.map((blog) => (
        <Link key={blog.id} to={`/blogs/${blog.id}`}>
          <div style={style}>{blog.title} {blog.author}</div>
        </Link>
      ))}
    </div>
  );
};

export default Blogs;
