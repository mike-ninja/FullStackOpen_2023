import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { deleteBlog, updateBlog } from "../request";

const Blog = ({ blog, loggedUser }) => {
  const queryClient = useQueryClient();
  const [view, setView] = useState(false);

  const hideWhenVisible = { display: view ? "none" : "" };
  const showWhenVisible = { display: view ? "" : "none" };

  let showRemoveButton;
  if (!blog.user) {
    showRemoveButton = { display: "none" };
  } else {
    showRemoveButton = {
      display: loggedUser.name === blog.user.name ? "" : "none",
    };
  }

  const toggleView = () => {
    setView(!view);
  };

  const updateBlogMutation = useMutation(updateBlog, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData("blogs");
      queryClient.setQueryData(
        "blogs",
        blogs.map((blog) => blog.id !== updatedBlog.id ? blog : updatedBlog),
      );
    },
  });

  const increaseLike = (blog) => {
    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
    };
    updateBlogMutation.mutate(updatedBlog);
  };

  const removeBlogMutation = useMutation(deleteBlog, {
    onSuccess: (deletedBlog) => {
      const blogs = queryClient.getQueryData("blogs");
      queryClient.setQueryData(
        "blogs",
        blogs.filter((blog) => blog.id !== deletedBlog),
      );
    },
  });

  const removeBlog = (blog) => {
    const result = window.confirm(
      `Removing blog ${blog.title} by ${blog.author}`,
    );
    if (result) {
      removeBlogMutation.mutate(blog);
    }
  };

  const user = blog.user ? blog.user.name : "";

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <button
        className="viewButton"
        style={hideWhenVisible}
        onClick={toggleView}
      >
        view
      </button>
      <button style={showWhenVisible} onClick={toggleView}>
        hide
      </button>
      <div className="extraData" style={showWhenVisible}>
        <p>{blog.url}</p>
        <div className="likes">
          likes {blog.likes}
          <button className="likeButton" onClick={() => increaseLike(blog)}>
            like
          </button>
        </div>
        <button
          className="remove"
          style={showRemoveButton}
          onClick={() => removeBlog(blog)}
        >
          remove
        </button>
        <p>{user}</p>
      </div>
    </div>
  );
};

export default Blog;
