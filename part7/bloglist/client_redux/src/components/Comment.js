import { useField } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import { newComment } from "../reducers/commentReducer";
import { ListGroup } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";

const Comment = ({ blog }) => {
  const dispatch = useDispatch();
  const comment = useField("text");

  const comments = useSelector(({comments}) => {
    return comments
      .map(comment => comment)
      .filter(comment => comment.blog === blog.id)
  })
  const onCreate = (event) => {
    event.preventDefault();
    const commentNew = {
      comment: comment.value,
      blog: blog.id,
    };
    comment.reset();
    dispatch(newComment(commentNew));
  };

  return (
    <div>
      <h3>Comments</h3>
      <div>
        <Form onSubmit={onCreate}>
          <Form.Control
            type={comment.type}
            onChange={comment.onChange}
          />
          <Button
            variant="primary"
            type="submit"
          >
            Add Comment
          </Button>
        </Form>
      </div>
      <ListGroup>
        {comments.map(comment => 
          <ListGroup.Item key={comment.id}>{comment.comment}</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default Comment;
