import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'


const Filter = (props)=>{
  return (<div>
    filter shown with <input value={props.filter}
          onChange={props.filterChanged} />


  </div>)

}

const PersonForm = (props)=>{
  return(
    <form onSubmit={props.addPerson} >
        <div>
          name: <input  value={props.NewName}
          onChange={props.handleNoteChange} />

          <div>number: <input value={props.number}
          onChange={props.handleNumberChange} /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )

}

const Persons = (props)=>{

  const persons=props.persons
  const filter=props.filter
  const filterPersons = (person)=>{

    if(person.name.toLowerCase().includes(filter)){
      return(
        <li key={person.name}>{person.name} {person.number} </li>
     )  
    }
  }
  return(<ul>

    {persons.map(filterPersons)}
    
    </ul>)
}


const App = (props) => {


  const [filter,setFilter] = useState("")
  const [persons, setPersons] = useState([])
  const [NewName, setNewName] = useState('')
  const [number,SetNewNumber] = useState('')
  

  const getPersonsFromServer=()=>{

    axios
    .get('http://localhost:3001/persons').then(response => {
      console.log('promise fulfilled')
      console.log(response.data)
      setPersons(response.data)
    })

  }
  useEffect(getPersonsFromServer, [])

  const handleNoteChange = (event) => {
    
    setNewName(event.target.value)
  }


  const handleNumberChange = (event)=>{
    SetNewNumber(event.target.value)

  }


  const filterChanged = (event)=>{
    setFilter(event.target.value.toLowerCase())
  }


  const addPerson = (event) => {
    event.preventDefault()
    
    if(persons.find(person=>person.name===NewName)){
      alert(`${NewName} is already added to phonebook`)
    }else{
      setPersons(persons.concat({"name":NewName,"number":number}))
    }

    SetNewNumber("")
    setNewName("")
  }

  

 
  console.log(persons.map((person)=>{
    return(
      <li key={person.name}></li>
    )  }))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterChanged={filterChanged} />
      
      <h2>Add a new</h2>

      <PersonForm addPerson={addPerson} number={number} NewName={NewName} handleNumberChange={handleNumberChange} handleNoteChange={handleNoteChange}
      />
      
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
     
      <div>debug: {NewName}</div>
   
    </div>
  )

}

export default App