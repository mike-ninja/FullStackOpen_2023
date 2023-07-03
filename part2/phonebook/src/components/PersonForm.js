const PersonForm = ({ newName, newNumber, handleNewName, handleNewNumber, addContact}) => {
  return (
    <div>
      <form>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit" onClick={addContact}>add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
