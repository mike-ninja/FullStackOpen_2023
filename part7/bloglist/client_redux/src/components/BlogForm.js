import { useField } from "../hooks/index";
import { useDispatch } from "react-redux";
import { newBlog } from "../reducers/blogReducer";
import { Button, Form } from "react-bootstrap";

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
    dispatch(newBlog(blog));
  };

  return (
    <div>
      <h2>Create a new entry</h2>
      <Form onSubmit={onCreate}>

      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type={title.type}
          onChange={title.onChange}
        />
        <Form.Label>Author</Form.Label>
        <Form.Control
          type={author.type}
          onChange={author.onChange}
        />
        <Form.Label>Url</Form.Label>
        <Form.Control
          type={url.type}
          onChange={url.onChange}
        />
        <Button variant="primary" type="submit">
          Add Blog
        </Button>
      </Form.Group>
      </Form>
    </div>
  )
};

export default BlogForm;
