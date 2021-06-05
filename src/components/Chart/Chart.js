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
  maintainAspectRatio: false,
  // plugins: {
  //   tooltip: {enabled: false}
  // },
  scales: { xAxes: [{ display: false, }], }
};

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
          pointRadius: 0.8
      }]
    });
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

    if (indicators?.length) {
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
        })
      }
      setLineData(prevData => ({
        labels: prevData.labels,
        datasets: [prevData.datasets[0], ...dsets]
      }));
    }

  //   if (indicators.length) {
  //     let indLen = indicators.length;
  //     let numOfIndApplied = lineData.datasets.length -1;

  //     if (numOfIndApplied < indLen) {  // element has been added to the indicators array.
  //       let dsets = [];

  //       for (let i = 0; i < indLen - numOfIndApplied; i++) { 
  //         // in case time-series is changed so applying all the remaining indicators.
  //         dsets.push({
  //             label: `${indicators[indLen-1- i].text}-${indicators[indLen-1 - i].period}`,
  //             data: calculateMovingAverage(indicators[indLen-1 - i]),
  //             fill: false,
  //             borderColor: indicators[indLen - 1 - i].color,
  //             pointRadius: 0.65,
  //             borderWidth: 0.6,
  //           });
  //       }
  //       setLineData(prevData => ({
  //         labels: prevData.labels,
  //         datasets: [...prevData.datasets, ...dsets]
  //       }));
  //     } else {
  //       let dsets = [];
  //       for (let i = 0; i < indLen; i++) {
  //         dsets.push({
  //           label: `${indicators[i].text}-${indicators[i].period}`,
  //           data: calculateMovingAverage(indicators[i]),
  //           fill: false,
  //           borderColor: indicators[i].color,
  //           pointRadius: 0.65,
  //           borderWidth: 0.6,
  //         })
  //       }
  //       setLineData(prevData => ({
  //         labels: prevData.labels,
  //         datasets: [prevData.datasets[0], ...dsets]
  //       }));
  //    }
  //  }
  }, [props.indicators, lineData]);


  // useEffect(() => {
  //   let indicators = props.indicators;
  //   if (indicators && indicators.length > 0) {
  //     let indLen = indicators.length;
  //     let dsets = lineData.datasets;
  //     let avgsLen = dsets.length - 1;  // 1 element is the original graph data
  
  //     if (avgsLen < indLen) {  // last element has been added.
  //       dsets.push({
  //         label: indicators[indLen-1],
  //         data: calculateMovingAverage(indicators[indLen-1]),
  //         fill: false,
  //         borderColor: "#B05022",
  //         pointRadius: 0.65,
  //         borderWidth: 0.6,
  //       })
  //     } else if (avgsLen > indLen) {  // last element has been removed.
  //       dsets.pop();
  //     }
  
  //     setLineData({
  //       labels: props.sessions,
  //       datasets: dsets
  //     });
  //   }
  // }, [props.indicators]);

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