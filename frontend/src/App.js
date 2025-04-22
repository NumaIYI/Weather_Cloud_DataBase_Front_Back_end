import React, { useState } from 'react';
import { fetchWeather } from './api';
import WeatherCard from './havacart';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchWeather(city);
      setWeather(response.data);

      const weeklyResponse = await fetch(`http://localhost:5000/weekly_avg?city=${city}`);
      const weeklyJson = await weeklyResponse.json();
      setWeeklyData(weeklyJson);

    } catch (error) {
      console.error("Veri alınamadı:", error);
    }
  };

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Şehir adı girin"
        />
        <button type="submit">Ara</button>
      </form>

      {weather && <WeatherCard data={weather} />}

      {weeklyData.length > 0 && (
        <div className="weekly-summary">
          <h3>Haftalık Ortalama Sıcaklıklar</h3>
          <ul>
            {weeklyData.map((day, index) => (
              <li key={index}>{day.day}: {day.avgTemp}°C</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
