const Contact = ({ contact, toggleDelete }) => {
  return (
    <div>
        <li>
          {contact.name} {contact.number}
          <button onClick={toggleDelete}>delete</button>
        </li>
    </div>
  )
}

export default Contact
