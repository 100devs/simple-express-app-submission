import {useState, useEffect} from 'react'
import phonebookService from './services/persons'
import Search from './components/Search'
import Add from './components/Add'
import PhoneBook from './components/Persons'
import Notification from './components/Notifications'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPhoneBook => setPersons(initialPhoneBook))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (newName && newNumber){
      if (persons.map(p => p.name).includes(newName) && persons.map(p => p.number).includes(newNumber)){
        alert(`${newName} is already in phonebook`)
        setNewName('')
        setNewNumber('')
      } else if (persons.map(person => person.name).includes(newName)){
        const person = persons.find(person => person.name.toLowerCase() == newName.toLowerCase())
        const changedPerson = {...person, number: newNumber}
        const id = person.id

        window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        phonebookService
          .update(id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name != newName ? person : returnedPerson))
            setNotification(`${newName}'s contact information has been updated!`)
            setTimeout(() => setNotification(null), 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(err => {
            setError(true)
            setNotification(
              `${newName} was already removed from server`
            )
            setTimeout(() => {
              setNotification(null)
              setError(false)
            }, 5000)
            setNotes(notes.filter(note => note.id !== id))
          })
      } else {
        phonebookService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNotification(`Added ${newName} to phonebook!`)
            setTimeout(() => setNotification(null), 5000)
            setNewName('')
            setNewNumber('')
          })
      }
    } 
  }

  const removePerson = (id, name) => {
    phonebookService
      .deleteOne(id)
      .then(res => {
        window.confirm(`Delete ${name}?`)
        setNotification(`${name} removed from phonebook!`)
        setTimeout(() => setNotification(null), 5000)
        setPersons(persons.filter(person => person.id != id))
      })
      .catch(err => {
        setError(true)
        setPersons(persons.filter(person => person.id != id))
        setNotification(
          `${name} was already removed from server`
        )
        setTimeout(() => {
          setNotification(null)
          setError(false)
        }, 5000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(search.toLocaleLowerCase())) || persons

  return (
    <div>
        <h2>PhoneBook</h2>
        <Notification message={notification} error={error}/>
        <Search search={search} handleSearch={handleSearch} />
        <h2>add a new</h2>
        <Add newName={newName} handleNameChange={handleNameChange} addPerson={addPerson}
             newNumber={newNumber} handleNumberChange={handleNumberChange} />
        <h2>Numbers</h2>
          {personsToShow.map(person => 
            <PhoneBook key={person.id} name={person.name} number={person.number} removeOne={() => removePerson(person.id, person.name)} />
          )}
    </div>
  )
}

export default App;
