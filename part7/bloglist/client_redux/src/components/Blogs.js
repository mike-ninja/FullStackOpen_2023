import { useSelector } from "react-redux";
import { useRef } from "react";

import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Blog from "./Blog";

const Blogs = () => {
  const blogFormRef = useRef();

  const blogs = useSelector(({ blogs }) => {
    return blogs
      .map(b => b)
      .sort((a, b) => b.likes - a.likes)
  })

  const blogForm = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  );

  return (
    <div>
      {blogForm()}
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
};

export default Blogs;
