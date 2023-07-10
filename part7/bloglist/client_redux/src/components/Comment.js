import { useField } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import { newComment } from "../reducers/commentReducer";

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
        <form onSubmit={onCreate}>
          <input
            id="comment"
            value={comment.value}
            onChange={comment.onChange}
          />
          <button
            id="btn"
            type="submit"
          >
            Add Comment
          </button>
        </form>
      </div>
      <ul>
        {comments.map(comment => 
          <li key={comment.id}>{comment.comment}</li>
        )}
      </ul>
    </div>
  );
};

export default Comment;
