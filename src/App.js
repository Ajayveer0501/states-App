import './App.css';
import React, {useState, useEffect} from 'react'


function App() {
let endpointCountries=" https://crio-location-selector.onrender.com/countries"
  const[country,setCountry]=useState([])
  const[state, setState]=useState([])
  const[city,setCity]=useState([])
  const[selectedCountry,setSelectedCountry]=useState("")
  const[selectedState, setSelectedState]=useState("")
  const[selectedCity,setSelectedCity]=useState("")
  useEffect(()=>{
    async function fetchCountries(){
      try{
        const response=await fetch(endpointCountries);
      const data= await response.json();
      setCountry(data);
      }catch(error){
        console.error("Error fetching countries", error)
      }
    }
    fetchCountries()
  },[]);
  
  useEffect(()=>{
    if(selectedCountry){
      const endpointState=`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      async function fetchStates(){
        try{
          const response= await fetch(endpointState);
          const data= await response.json();
          setState(data);
        }catch(error){
            console.error("Error fetching states", error)
          }
      }
      fetchStates()
    }
    
  },[selectedCountry]);
  
  useEffect(()=>{
    if(selectedCountry && selectedState){
      const endpointCity=`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      async function fetchCities(){
        try{
          const response = await fetch(endpointCity);
          const data= await response.json();
          setCity(data)
        }catch(error){
          console.error("Error fetching cities", error)
        }
      }
      fetchCities()
    }
    
  },[selectedCountry,selectedState]);
  
  return (
    <div className="App">
      <h1>Select Location</h1>
      <label>
      <select value={selectedCountry} onChange={(e)=>(setSelectedCountry(e.target.value))}>
        <option>Select country</option>
        {country.map((countries)=>(
          <option key={countries} value={countries}>{countries}</option>
        ))}
        <option>Select country</option>
      </select>
      </label>
      <label>
        <select value={selectedState} onChange={(e)=>(setSelectedState(e.target.value))}>
          <option>Select State</option>
          {state.map((states)=>(
          <option key={states} value={states}>{states}</option>
        ))}
          </select>
      </label>
      <label>
        <select value={selectedCity} onChange={(e)=>(setSelectedCity(e.target.value))}>
          <option>Select City</option>
          {city.map((cities)=>(
            <option key={cities} value={cities}>{cities}</option>
          ))}

        </select>
      </label>
      {(selectedCountry && selectedState && selectedCity)? `You selected ${selectedCity},${selectedState},${selectedCountry}`: null}
      
      

    </div>
  );
}

export default App;
