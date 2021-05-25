import React, { useState } from 'react';
import "./TimeSeries.css";

const Periods = ["Daily", "Weekly", "Monthly"];

function TimeSeries() {
  const [duration, setDuration] = useState(Periods[0]);

  return (
    <div className = "timeseries">
      
      <div className = "timeseries__chart">

      </div>
      <div className = "timeseries__volume">

      </div>
    </div>
  );
}

export default TimeSeries;