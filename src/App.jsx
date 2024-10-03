import React, { useState, useEffect } from "react";
import axios from 'axios';
import Search from './components/Search';
import WeatherInfo from './components/WeatherInfo';
import WeatherDetails from './components/WeatherDetails';
import './index.css';

function App() {
  const [data, setData] = useState({});
  const [city, setCity] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const dateBuilder = (d) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    const days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
    ];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const searchCity = async (event) => {
    if (event.key === 'Enter') {
      try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=04de853989ac60cfe02d5a81b9971bad`);
        const weatherData = res.data;

        try {
          const countryRes = await axios.get(`https://restcountries.com/v2/alpha/${weatherData.sys.country}`);
          weatherData.country = countryRes.data.name;
        } catch (countryError) {
          console.error('Error fetching country data', countryError);
          weatherData.country = weatherData.sys.country;
        }

        setData(weatherData);
      } catch (error) {
        console.error('Error fetching weather data', error);
        setData({});
      }
      setCity('');
    }
  };

  return (
    <div className={`app ${data.weather ? `app-${data.weather[0].main.toLowerCase()}` : ''}`}>
      <Search city={city} setCity={setCity} handleSearch={searchCity} />
      {data.main && (
        <div className="container">
          <WeatherInfo data={data} currentTime={currentTime} dateBuilder={dateBuilder} />
          <WeatherDetails data={data} />
        </div>
      )}
    </div>
  );
}

export default App;