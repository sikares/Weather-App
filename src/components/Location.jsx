import React from 'react';
import { FaLocationDot } from "react-icons/fa6";

function Location({ name, country }) {
  return (
    <div className="location">
      <p style={{ textTransform: 'uppercase' }}>
        <FaLocationDot style={{ marginRight: '6px' }} />
        {name}, {country}
      </p>
    </div>
  );
}

export default Location;
