import React from 'react';
import { TiWeatherCloudy } from "react-icons/ti";
import Location from './Location';
import DateTime from './DateTime';

function WeatherInfo({ data, currentTime, dateBuilder }) {
  return (
    <div className="top">
      <Location name={data.name} country={data.country} />
      <div className="temp">
        <h1>{Math.round(data.main.temp - 273.15)}°C</h1>
      </div>
      <DateTime currentTime={currentTime} dateBuilder={dateBuilder} />
      <div className="description">
        <p style={{ textTransform: 'uppercase' }}>
          <TiWeatherCloudy style={{ verticalAlign: 'text-bottom', marginRight: '6px', fontSize: '35px' }} />
          {data.weather[0].main}
        </p>
      </div>
    </div>
  );
}

export default WeatherInfo;
