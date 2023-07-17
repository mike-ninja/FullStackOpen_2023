import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { ADD_BOOK, EDIT_BORN, GET_ALL } from "./queries";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(GET_ALL);
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_ALL }],
    onError: (error) => {
      const messages = error.graphQLErrors[0].message;
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

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button
          style={{ display: (token ? "" : "none") }}
          onClick={() => setPage("add")}
        >
          add book
        </button>
        <button
          style={{ display: (token ? "none" : "") }}
          onClick={() => setPage("login")}
        >
          login
        </button>
        <button
          style={{ display: (token ? "" : "none") }}
          onClick={logout}
        >
          logout
        </button>
      </div>

      <Notification errorMessage={errorMessage} />

      <Authors
        show={page === "authors"}
        authors={result.data.allAuthors}
        editBorn={editBorn}
      />

      <Books show={page === "books"} books={result.data.allBooks} />

      <NewBook show={page === "add"} addBook={addBook} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        notify={notify}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
