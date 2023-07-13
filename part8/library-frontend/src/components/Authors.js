import { useState } from "react";

const AuthorEdit = ({ editBorn }) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const setBornTo = parseInt(year);
    editBorn({ variables: { name, setBornTo } });
    setName("");
    setYear("");
  };

  return (
    <div>
      <h3>Set Birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          year{" "}
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  );
};

const Authors = (props) => {
  if (!props.show) {
    return null;
  }

  const authors = props.authors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorEdit editBorn={props.editBorn} />
    </div>
  );
};

export default Authors;
