import React from 'react';
import { WiTime5 } from "react-icons/wi";
import { MdCalendarToday } from "react-icons/md";

function DateTime({ currentTime, dateBuilder }) {
  return (
    <div className="date">
      <p>
        <MdCalendarToday style={{ verticalAlign: 'text-bottom', marginRight: '8px', fontSize: '26px' }} />
        {dateBuilder(new Date())}
      </p>
      <p>
        <WiTime5 style={{ verticalAlign: 'text-bottom', marginRight: '6px', fontSize: '28px' }} />
        {currentTime.toLocaleTimeString()}
      </p>
    </div>
  );
}

export default DateTime;
