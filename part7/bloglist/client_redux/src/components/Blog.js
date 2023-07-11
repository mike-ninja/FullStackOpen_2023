import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { likeBlog } from "../reducers/blogReducer";
import Comment from "./Comment"

const Blog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blog = useSelector(({ blogs }) => {
    return blogs
      .map((blog) => blog)
      .filter((blog) => blog.id === id)[0];
  });
  if (!blog) {
    return null;
  }

  const increaseLike = (blog) => {
    const likedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
    };
    dispatch(likeBlog(likedBlog));
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <a
        href={blog.url}
        target="_blank"
        rel="noreferrer"
      >
        {blog.url}
      </a>
      <div className="likes">
        {blog.likes} likes
        <Button className="likeButton" onClick={() => increaseLike(blog)}>
          like
        </Button>
      </div>
      <p>added by {blog.user.name}</p>
      <Comment blog={blog}/>
    </div>
  );
};

export default Blog;
