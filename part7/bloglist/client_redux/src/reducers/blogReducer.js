import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    like(state, action) {
      const id = action.payload;
      const blogToChange = state.find((a) => a.id === id);
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      };
      return state.map((blog) => blog.id !== id ? blog : changedBlog);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { setBlogs, appendBlog, like, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const newBlog = (newBlog) => {
  return async (dispatch) => {
    const blog = await blogService.create(newBlog);
    dispatch(appendBlog(blog));
  };
};

export const likeBlog = (likedBlog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(likedBlog.id, likedBlog);
    dispatch(like(updatedBlog.id));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.removeBlog(id);
    dispatch(removeBlog(id));
  };
};

export default blogSlice.reducer;
