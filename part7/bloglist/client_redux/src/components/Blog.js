import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { useUserValue } from "../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const loggedUser = useSelector(({user}) => user);
  const dispatch = useDispatch();
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

  const increaseLike = (blog) => {
    const likedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
    };
    dispatch(likeBlog(likedBlog))
  };

  const removeBlog = (blog) => {
    dispatch(deleteBlog(blog.id))
  }

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
