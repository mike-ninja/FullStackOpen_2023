import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_BOOK, EDIT_BORN, GET_ALL } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);

  const result = useQuery(GET_ALL);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_ALL }],
    onError: (error) => {
      const messages = error.graphQLErrors[0].extensions.error.message;
      notify(messages);
    },
  });
  const [editBorn] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: GET_ALL }],
    onError: (error) => {
      const messages = error.graphQLErrors[0].message;
      notify(messages);
    },
  });

  if (result.loading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Notification errorMessage={errorMessage} />

      <Authors
        show={page === "authors"}
        authors={result.data.allAuthors}
        editBorn={editBorn}
      />

      <Books show={page === "books"} books={result.data.allBooks} />

      <NewBook show={page === "add"} addBook={addBook} />
    </div>
  );
};

export default App;
