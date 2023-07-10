const commentsRouter = require("express").Router();
const Comment = require("../models/comments");

// Getting all comments a comment
commentsRouter.get("/", async (request, response) => {
  const comments = await Comment.find({})
  response.json(comments);
});

// Posting a comment
commentsRouter.post("/", async (request, response) => {
  const body = request.body;

  const comment = new Comment({
    comment: body.comment,
    blog: body.blog,
  });
  const savedComment = await comment.save();
  response.status(201).json(savedComment);
});

module.exports = commentsRouter;
