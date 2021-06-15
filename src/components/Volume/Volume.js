import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import './Volume.css';

function Volume ({sessions, volume, close}) {
  const [bardata, setBarData] = useState({});
  const barOptions = {
    legend: { 
      display: false,
    },
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            callback: function(label, index, labels) {
              return label/1000000+'M';
            }
          }
        }
      ]
  }
  };

  useEffect(() => {
    const getBackgroundColor = () => {
      let bgColor = ['#89D65C'];
      for (let i = 1; i < close.length; i++) {
        if (close[i] < close[i-1]) {
          bgColor.push('#FF7043');
        } else {
          bgColor.push('#89D65C');
        }
      }
  
      return bgColor;
    }

    setBarData({
      labels: sessions,
      datasets: [{
        backgroundColor: getBackgroundColor(),
        label: 'volume',
        data: volume
      }]
    });
  }, [volume, sessions, close]);
  

  return (
    <div className = "volume">
      <Bar
        data = {bardata}
        options = {barOptions}
        width = {100}
        height = {50}
      />
    </div>
  );
}

export default Volume;