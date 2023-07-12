import { gql } from "@apollo/client";

export const GET_ALL = gql`
  query {
    allBooks {
      title
      author
      published
    }
    allAuthors {
      name
      born
      bookCount
    }  
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $intPublished: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $intPublished,
      genres: $genres
    ) {
      title
      author
      published
    } 
  }
`;
