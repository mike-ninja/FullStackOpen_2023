import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comments";

const commentSlice = createSlice({
  name: "comment",
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload;
    },
    appendComment(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setComments, appendComment } = commentSlice.actions;

export const initialComments = () => {
  return async (dispatch) => {
    const comments = await commentService.getComments();
    dispatch(setComments(comments));
  };
};

export const newComment = (newComment) => {
  return async (dispatch) => {
    const comment = await commentService.addComment(newComment);
    dispatch(appendComment(comment));
  };
};

export default commentSlice.reducer;
