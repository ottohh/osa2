import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = (props)=>{
  
  return(
    <div>
      <h1>{props.country.name.common}</h1>
      
      <p>Capital {props.country.capital}</p>
      
      
      <p>Area {props.country.area}</p>

      <b>Languages</b>
      <br/>
      <ul>
      {Object.values(props.country.languages).map(language=>(<li>{language}</li>))}
      </ul>
      <img src={props.country.flags.png}/>


    </div>

  )

}


const Countries=(props)=>{
  if(props.countries.length===0)return(<></>)
  if(props.countries.length>10)return (<div>Too many matches, specify another filter<br/></div>)


  if(props.countries.length===1)return(<><Country country={props.countries[0]} /></>)



  return(
  <ul>
    {props.countries.map(country=>{

      return(
        <li>{country.name.common}<button onClick={()=>props.showCountry(country.name.common)}>show</button></li>
      )

    }
    )}

  </ul>)


}




const App = () => {

  const [allCountries,setAllCountries]=useState("")
  const [searchValue,setSearchValue]=useState("")
  const [countriesToShow,setCountries]=useState([])


  const showCountry =(country)=>{
    searchValueChanged({"target":{"value":country}})
  }


  const searchValueChanged =(event)=>{
    
    setSearchValue(event.target.value)
    let search = event.target.value
    console.log(search)
    if(search==""){
      setCountries([])
      return;
    }

    let countriesMatchingSearchCase = allCountries.filter((Country)=>{
       
       return Country.name.common.toLowerCase().includes(search.toLowerCase())
    })
    console.log(countriesMatchingSearchCase)
    
    setCountries(countriesMatchingSearchCase)


  }


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setAllCountries(response.data)
        console.log(response.data)
      })
  }, [])

  

  return (

    <div>
    find countries <input value={searchValue}
          onChange={searchValueChanged} />

    <Countries countries={countriesToShow} showCountry={showCountry}/>
    </div>

  )
}

export default App;
