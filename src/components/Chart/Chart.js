import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "./Chart.css";
import movingAvg from "../../lib/moving-avg";

function Chart(props) {
  const [lineData, setLineData] = useState({});

  useEffect(() => {
    setLineData({
      labels: props.sessions,
      datasets: [{
          label: 'close',
          data: props.close,
          fill: true,
          borderColor: "#742774",
          pointRadius: 0.8,
          pointHoverRadius:10
      }]
    });

    return function cleanup() {
      setLineData({});
    }
  }, [props.close]);

  const calculateMovingAverage = (indicator) => {
    let avg = [];

    if (indicator.text === 'SMA')
      avg = movingAvg.get_simple_ma(indicator.period, props.close);
    if (indicator.text === 'EMA') 
      avg = movingAvg.get_exponential_ma(indicator.period, props.close);

    return avg;
  }

  useEffect(() => {
    let { indicators } = props;

    if (indicators?.length && lineData?.datasets.length) {
      // add dataset
      let indLen = indicators.length;
      let numOfIndApplied = lineData.datasets.length -1;

      if (numOfIndApplied < indLen) {  // element has been added to the indicators array.
        let dsets = [];

        for (let i = 0; i < indLen - numOfIndApplied; i++) { 
          // in case time-series is changed so applying all the remaining indicators.
          dsets.push({
              label: `${indicators[indLen-1- i].text}-${indicators[indLen-1 - i].period}`,
              data: calculateMovingAverage(indicators[indLen-1 - i]),
              fill: false,
              borderColor: indicators[indLen - 1 - i].color,
              pointRadius: 0.65,
              borderWidth: 0.6,
              pointHoverRadius:10
            });
        }
        setLineData(prevData => ({
          labels: prevData.labels,
          datasets: [...prevData.datasets, ...dsets]
        }));
      } 
    }

    if (indicators && lineData.datasets.length -1 > indicators.length) {
      let dsets = [];
      for (let i = 0; i < indicators.length; i++) {
        dsets.push({
          label: `${indicators[i].text}-${indicators[i].period}`,
          data: calculateMovingAverage(indicators[i]),
          fill: false,
          borderColor: indicators[i].color,
          pointRadius: 0.65,
          borderWidth: 0.6,
          pointHoverRadius:10
        })
      }
      setLineData(prevData => ({
        labels: prevData.labels,
        datasets: [prevData.datasets[0], ...dsets]
      }));
    }
  }, [props.indicators, lineData]);

  const getLineOptions = () => {
    let options = {
      legend: {
          display: false,
      },
      maintainAspectRatio: false,
      tooltips: {
        mode: 'index',
        intersect: false
     },
     hover: {
        mode: 'index',
        intersect: false
     },
      scales: { 
        xAxes: [{ display: false, }]
      }
    };

    if (props.showLabel) {
      options.legend.display = true;
      options.scales.xAxes[0].display = true;
    }

    return options;
  }

  return (
    <div className = "chart">
      <div className = "chart__line">
        <Line
          data = {lineData}
          options = {getLineOptions()}
        />      
      </div>
    </div>
  );
};

export default Chart;