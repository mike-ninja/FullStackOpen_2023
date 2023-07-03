import { useState, useEffect } from 'react'

import Contact from './components/Contact'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Error from './components/Error'
import contactService from './services/contacts'

function App() {
  const [contacts, setContact] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setContact(initialContacts)
      })
  }, [])

  const addContact = (event) => { 
    event.preventDefault()
    const index = contacts.map(item => item.name).indexOf(newName)
    if (index === -1) {
      const newContact = {
        name: newName,
        number: newNumber,
      }
      contactService
        .create(newContact)
        .then(updatedContacts => {
          setNotificationMessage(`Added ${newContact.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
          setContact(contacts.concat(updatedContacts))
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
    } else {
      const msg = `${newName} is already in the phonebook, replace the old number with a new one?`
      if (window.confirm(msg) === true) {
        const updatedContact = { ...contacts[index], number: newNumber }
        contactService
          .update(updatedContact.id, updatedContact).then(contactUpdated => {
            setNotificationMessage(`Updated ${updatedContact.name}`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 3000)
          })
          .catch(error => {
            setErrorMessage(`${updatedContact.name} not found`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })
        setContact(contacts.map(contact => contact.id !== updatedContact.id ? contact : updatedContact))
    }
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const setFilterInput = (event) => {
    setFilter(event.target.value)
  }

  const removeContact = (contact) => {
    const id = contact.id
    if (window.confirm(`Delete ${contact.name}?`) === true) {
       contactService
        .remove(contact.id)
        .then(responseData => {
          setContact(contacts.filter(contact => 
            contact.id !== id
          ))
        })
    }
  }

  if (!contacts) {
    return null
  } else {
    const filteredShow = contacts.filter(contact => contact.name.indexOf(filter) !== -1)
    return (
      <div>
        <h2>Phonebook</h2>
        <Notification message={notificationMessage}/>
        <Error message={errorMessage}/>
        <Filter filter={filter} eventHandler={setFilterInput} />
        <PersonForm newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} addContact={addContact}/>
        <h2>Contacts</h2>
        <ul>
          {filteredShow.map(contact => 
            <Contact
              key={contact.id}
              contact={contact}
              toggleDelete={() => removeContact(contact)}
            />
          )}
        </ul>
      </div>
    )
  }
}

export default App;
