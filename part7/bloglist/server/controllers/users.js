const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

// Getting the array of Users populated with blogs linked to them
usersRouter.get("/", async (request, response) => {
  const users = await User
    .find({}).populate("blogs", { title: 1, url: 1, likes: 1 });
  response.json(users);
});

// Getting a User and populat with blogs
usersRouter.get("/:id", async (request, response) => {
  const users = await User
    .findById(request.params.id).populate("blogs", {
      title: 1,
      url: 1,
      likes: 1,
    });
  response.json(users);
});

// Creating a new user
usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || username.length < 3) {
    response.status(400).json({ error: "username is invalid" });
  } else if (!password || password.length < 3) {
    response.status(400).json({ error: "password is invalid " });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
