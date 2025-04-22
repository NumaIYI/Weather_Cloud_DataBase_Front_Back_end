import React, { useState } from 'react';  
import { fetchWeather } from './api';  
import WeatherCard from './havacart';  

function App() {  
  const [city, setCity] = useState('');  
  const [weather, setWeather] = useState(null);  

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    const response = await fetchWeather(city);  
    setWeather(response.data);  
  };  

  return (  
    <div>  
      <form onSubmit={handleSubmit}>  
        <input  
          type="text"  
          value={city}  
          onChange={(e) => setCity(e.target.value)}  
          placeholder="Şehir adı girin"  
        />  
        <button type="submit">Ara</button>  
      </form>  
      {weather && <WeatherCard data={weather} />}  
    </div>  
  );  
}  

export default App;  