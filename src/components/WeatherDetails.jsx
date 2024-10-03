import React from 'react';
import { FaTemperatureHigh } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";
import { FiWind } from "react-icons/fi";

function WeatherDetails({ data }) {
  return (
    <div className="bottom">
      <div className="feels">
        <p className="bold">{Math.round(data.main.feels_like - 273.15)}°C</p>
        <p>
          <FaTemperatureHigh style={{ marginRight: '8px' }} />
          Feels Like
        </p>
      </div>
      <div className="humidity">
        <p className="bold">{data.main.humidity}%</p>
        <p>
          <IoIosWater style={{ marginRight: '5px' }} />
          Humidity
        </p>
      </div>
      <div className="wind">
        <p className="bold">{data.wind.speed} m/s</p>
        <p>
          <FiWind style={{ marginRight: '9px' }} />
          Wind Speed
        </p>
      </div>
    </div>
  );
}

export default WeatherDetails;
