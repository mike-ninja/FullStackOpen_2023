import { useState } from "react";

const AuthorEdit = ({ authors, editBorn }) => {
  const [year, setYear] = useState("");

  const submit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const name = Object.fromEntries(formData.entries()).selectedAuthor;

    const setBornTo = parseInt(year);
    editBorn({ variables: { name, setBornTo } });
    setYear("");
  };

  const authorSelect = authors.map((a) => a).filter((a) => !a.born);

  if (!authorSelect[0]) {
    return null;
  }

  return (
    <div>
      <h3>Set Birthyear</h3>
      <form onSubmit={submit}>
        <select name="selectedAuthor">
          {authorSelect.map((author) => (
            <option key={author.name} value={author.name}>{author.name}</option>
          ))}
        </select>
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
      <AuthorEdit authors={authors} editBorn={props.editBorn} />
    </div>
  );
};

export default Authors;
