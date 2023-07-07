import { useField } from "../hooks/index";
import { useDispatch } from "react-redux";
import { newBlog } from "../reducers/blogReducer";

const BlogForm = () => {
  const dispatch = useDispatch();
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const onCreate = (event) => {
    event.preventDefault();
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0,
    };
    title.reset();
    author.reset();
    url.reset();
    dispatch(newBlog(blog))
  };

  return (
    <div>
      <h2>Create a new entry</h2>
      <form onSubmit={onCreate}>
        <div>
          Title
          <input
            id="title"
            value={title.value}
            onChange={title.onChange}
          />
        </div>
        <div>
          Author
          <input
            id="author"
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          Url
          <input
            id="url"
            value={url.value}
            onChange={url.onChange}
          />
        </div>
        <button
          id="addBlog-button"
          type="submit"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
