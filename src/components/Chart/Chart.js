import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { csv } from "d3";
import st from  "../../data/2019-2020.csv";

import "./Chart.css";

function Chart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv(st).then(response => setData(response));
  }, []);

  // const d = [12, 19, 3, 5, 23, 3,34, 44, 12, 33, 45, 67, 22 ,1, 23, 3, 44, 21];
  // let bgColor = ['#89D65C']
  // const getBackgroundColor = () => {
  //   for (let i = 1; i < d.length; i++) {
  //     if (d[i] < d[i-1]) {
  //       bgColor.push('#FF7043');
  //     } else {
  //       bgColor.push('#89D65C');
  //     }
  //   }
  //   return bgColor;
  // }

  const getGraphData = () => {
    let close = [];
    data.forEach(d => close.push(d.Close));

    return close;
  }

  const getLabels = () => {
    let label = [];
    data.forEach(d => label.push(d.Date));

    return label;
  }

  const graphData = {
    labels: getLabels(),
    datasets: [{
        label: 'close',
        data: getGraphData(),
        fill: true,
        borderColor: "#742774"
    }]
  }

  return (
    <div className = "chart">
      <Line
        data={graphData}
     />
    </div>
  );
};

export default Chart;