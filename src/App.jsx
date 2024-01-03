import React, { useState, useEffect } from "react";
import axios from 'axios'
import { FaLocationDot } from "react-icons/fa6";
import { FaTemperatureHigh } from "react-icons/fa";
import { TiWeatherCloudy } from "react-icons/ti";
import { IoIosWater } from "react-icons/io";
import { FiWind } from "react-icons/fi";
import { WiTime5 } from "react-icons/wi";
import { MdCalendarToday } from "react-icons/md";

function App() {
  const [data,setData] = useState({})
  const [city, setCity] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date());

  const dateBuilder = (d) => {
    let months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    let days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const searchCity = (event) => {
    if (event.key === 'Enter') {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=04de853989ac60cfe02d5a81b9971bad`)
      .then((res) => {
        setData(res.data)
        console.log(res.data);
      })
      setCity('')
    }
  }
  // const tempCelsius = Math.round(data.main.temp - 273.15);
  // const feelsLikeCelsius = Math.round(data.main.feels_like - 273.15);

  return (
    <div className={`app ${data.weather && `app-${data.weather[0].main.toLowerCase()}`}`}>
      <div className="search">
        <input type="text" value={city}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            searchCity(event);
          }
        }}
        onChange={event => setCity(event.target.value.toUpperCase())}
        placeholder="Search Location"/>
      </div>
      {data.main !== undefined &&
      <div className="container">
        <div className="top">
          <div className="location">
          <p style={{textTransform:'uppercase'}}><FaLocationDot style={{marginRight: '6px'}} />{data.name}</p>
          </div>
          <div className="temp">
            {/* {data.main ? <h1>{Math.round(data.main.temp - 273.15)}°C</h1> : null} */}
            {data.main && <h1>{Math.round(data.main.temp - 273.15)}°C</h1>}
          </div>
          <div>
            {data.main && 
              <div className="date">
                <p><MdCalendarToday style={{verticalAlign: 'text-bottom', marginRight: '8px', fontSize: '26px'}}/>{dateBuilder(new Date())}</p>
                <p><WiTime5 style={{verticalAlign: 'text-bottom', marginRight: '6px', fontSize: '28px'}}/>{currentTime.toLocaleTimeString()}</p>
              </div>
            }
          </div>
          <div className="description">
            {data.main && <p style={{ textTransform:'uppercase'}}><TiWeatherCloudy style={{verticalAlign: 'text-bottom', marginRight: '6px', fontSize: '35px'}}/>{data.weather[0].main}</p>}
          </div>
        </div>
          <div className="bottom">
          <div className="feels">
            {data.main && <p className="bold">{Math.round(data.main.feels_like - 273.15)}°C</p>}
            <p><FaTemperatureHigh style={{marginRight: '8px'}}/>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main && <p className="bold">{data.main.humidity}%</p>}
            <p><IoIosWater style={{marginRight: '5px'}}/>Humidity</p>
          </div>
          <div className="wind">
            {data.main && <p className="bold">{data.wind.speed} m/s</p>}
            <p><FiWind style={{marginRight: '9px'}}/>Wind Speed</p>
          </div>
        </div>
      </div>
      }
    </div>
  );
}

export default App;