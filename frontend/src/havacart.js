import React from 'react';

const havacart = ({ data }) => {
  // Kelvin'den Celsius'a dönüşüm
  const tempCelsius = (data.main.temp ).toFixed(1);
  const feelsLikeCelsius = (data.main.feels_like ).toFixed(1);
  const windDirections = ["Kuzey", "Kuzeydoğu", "Doğu", "Güneydoğu", "Güney", "Güneybatı", "Batı", "Kuzeybatı"];
  const windDir = windDirections[Math.round(data.wind.deg / 45) % 8];
  return (
    <div className="weather-card">
      <h2>{data.name}, {data.sys.country}</h2>
      <p>🌡️ Sıcaklık: {tempCelsius}°C</p>
      <p>🤒 Hissedilen: {feelsLikeCelsius}°C</p>
      <p>☁️ Durum: {data.weather[0].description}</p>
      <p>💧 Nem: {data.main.humidity}%</p>
      <p>Rüzgar Yönü: {windDir}</p>
      <img 
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={data.weather[0].description}
      />
    </div>
  );
};

export default havacart;