import axios from 'axios';  

export const fetchWeather = (city) => {  
  return axios.get(`http://localhost:5000/weather?city=${city}`);  
};  