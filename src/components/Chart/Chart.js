import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { count, csv, lab, line } from "d3";
// import { ma, dma, ema, sma, wma } from 'moving-averages'
import "./Chart.css";
import movingAvg from "../../lib/moving-avg";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


//API_KEY=5BJK4Y03JXIM6RRN
const options= {
  legend: {
      display: false,
  },
//  maintainAspectRatio: false,
  // plugins: {
  //   tooltip: {enabled: false}
  // },
  //scales: { xAxes: [{ display: false, }], }
};

function Chart(props) {
  console.log(props)
  const [lineData, setLineData] = useState({});

  useEffect(() => {
    setLineData({
      labels: props.sessions,
      datasets: [{
          label: 'close',
          data: props.close,
          fill: true,
          borderColor: "#742774",
          pointRadius: 0.8
      }]
    });
  }, [props.close]);

  const calculateMovingAverage = (indicator) => {
    let avg = [];

    if (indicator === '20ma')
      avg = movingAvg.get_simple_ma(20, props.close);
    if (indicator === '20ema') 
      avg = movingAvg.get_exponential_ma(20, props.close);
    if (indicator === '50ema')
      avg = movingAvg.get_exponential_ma(50, props.close);

    return avg;
  }

  useEffect(() => {
    let indicators = props.indicators;
    if (indicators && indicators.length > 0) {
      let indLen = indicators.length;
      let dsets = lineData.datasets;
      let avgsLen = dsets.length - 1;  // 1 element is the original graph data
  
      if (avgsLen < indLen) {  // last element has been added.
        dsets.push({
          label: indicators[indLen-1],
          data: calculateMovingAverage(indicators[indLen-1]),
          fill: false,
          borderColor: "#B05022",
          pointRadius: 0.65,
          borderWidth: 0.6,
        })
      } else if (avgsLen > indLen) {  // last element has been removed.
        dsets.pop();
      }
  
      setLineData({
        labels: props.sessions,
        datasets: dsets
      });
    }
  }, [props.indicators]);

  return (
    <div className = "chart">
      <div className = "chart__line">
        <Line
          data = {lineData}
          options = {options}
        />      
      </div>
    </div>
  );
};

export default Chart;