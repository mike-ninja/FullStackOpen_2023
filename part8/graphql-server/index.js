const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/users");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("Connecting to", MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connection to MongoDB:", error.message);
  });

// let authors = [
//   {
//     name: "Robert Martin",
//     id: "afa54ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1955,
//   },
//   {
//     name: "Martin Fowler",
//     id: "afa8b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1966,
//   },
//   {
//     name: "Fyodor Dostoevsky",
//     id: "afa8b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1824,
//   },
//   {
//     name: "Joshua Kerievsky", // birthyear not known
//     id: "afa8b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   {
//     name: "Sandi Metz", // birthyear not known
//     id: "afa8b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ];
//
// /*
//  * Suomi:
//  * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
//  * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
//  *
//  * English:
//  * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
//  * However, for simplicity, we will store the author's name in connection with the book
//  *
//  * Spanish:
//  * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
//  * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
//  */
//
// let books = [
//   {
//     title: "Clean Code",
//     published: 2011,
//     author: "Robert Martin",
//     id: "afa8b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring"],
//   },
//   {
//     title: "Agile software development",
//     published: 2005,
//     author: "Robert Martin",
//     id: "afa8b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ["agile", "patterns", "design"],
//   },
//   {
//     title: "Refactoring, edition 5",
//     published: 2021,
//     author: "Martin Fowler",
//     id: "afa8de00-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring"],
//   },
//   {
//     title: "Refactoring to patterns",
//     published: 2011,
//     author: "Joshua Kerievsky",
//     id: "afa8de01-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring", "patterns"],
//   },
//   {
//     title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
//     published: 2015,
//     author: "Sandi Metz",
//     id: "afa8de02-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring", "design"],
//   },
//   {
//     title: "Crime and punishment",
//     published: 1869,
//     author: "Fyodor Dostoevsky",
//     id: "afa8de03-344d-11e9-a414-719c6709cf3e",
//     genres: ["classic", "crime"],
//   },
//   {
//     title: "The Demon",
//     published: 1875,
//     author: "Fyodor Dostoevsky",
//     id: "afa8de04-344d-11e9-a414-719c6709cf3e",
//     genres: ["classic", "revolution"],
//   },
// ];

/*
  you can remove the placeholder query once your first own has been implemented
*/

const typeDefs = `
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }  

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate("author");
      if (!args.author && !args.genre) {
        return books;
      } else if (args.author && !args.genre) {
        return books.map((book) => book).filter((book) =>
          args.author === book.author.name
        );
      } else if (!args.author && args.genre) {
        return books.map((book) => book).filter((book) =>
          book.genres.includes(args.genre)
        );
      } else if (args.author && args.genre) {
        const filteredByAuthor = books.map((book) => book).filter((book) =>
          args.author == book.author.name
        );
        return filteredByAuthor.map((book) => book).filter((book) =>
          book.genres.includes(args.genre)
        );
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      return authors.map((author) => {
        const bookCount = Book.collection.countDocuments({
          author: author._id,
        });
        return {
          name: author.name,
          born: author.born,
          bookCount: bookCount,
        };
      });
    },
    me: (root, args, { currentUser }) => {
      return currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({
          name: args.author,
          born: null,
        });
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError("Saving Author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      }
      const book = new Book({
        ...args,
        author: author,
      });
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Saving Book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }
      return book;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        throw new GraphQLError("Author not in db", {
          extendions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }

      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Editing author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      const bookCount = Book.collection.countDocuments({
        author: author._id,
      });
      return {
        name: author.name,
        born: author.born,
        bookCount: bookCount,
      };
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });
      return user.save()
        .catch((error) => {
          throw new GraphQLError("Creating the user failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.username,
              error,
            },
          });
        });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("Wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET,
      );
      const currentUser = await User
        .findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
