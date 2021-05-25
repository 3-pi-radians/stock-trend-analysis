import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { count, csv, line } from "d3";

import Chart from './components/Chart/Chart';
import Volume from './components/Volume/Volume';
import Card from './components/Card/Card';
import Landing from './modules/Landing/Landing';

import './App.css';

import lib from './lib';

import d5 from "./data/5year.csv";
import d19 from "./data/2019-2020.csv";
import d20 from "./data/2020-2021.csv";
import d18 from "./data/2018-2019.csv";
import d17 from "./data/2017-2018.csv";
import d16 from "./data/2016-2017.csv";
import StockFinder from "./modules/StockFinder/StockFinder";

const movingAvg = lib.movingAvg;
const marketTrend = lib.marketTrend;
const getApiData = lib.apiData;

function App() {
  const [trendLevel, setTrendLevel] = useState(1);
  const [close, setClose] = useState([]);
  const [volume, setVolume] = useState([]);
  const [data, setData] = useState([]);
  const [lineData, setLineData] = useState({});
  const [barData, setBarData] = useState({});
  const [distDays, setDistDays] = useState(null);
  const [distDates , setDistDates] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    csv(d17).then(response => setData(response));
  }, []);

  useEffect(() => {
    data.forEach(d => {
      setSessions(s => [...s, d.Date]);
      setClose(c => [...c, parseFloat(d.Close)]);
      setVolume(v => [...v, parseFloat(d.Volume)]);
    });

  }, [data]);




  const calculateDistributionDays = () => {
    if (!distDays) {
      for (let i = 1; i < data.length; i++) {
        let prcnt = 100 * (data[i].Close - data[i-1].Close)/data[i-1].Close;
        if (prcnt < -0.25 && data[i].Volume > data[i-1].Volume) {       
          setDistDays(n=>n+1);
          setDistDates(d => [...d, data[i].Date]);
        }
      }
  
     calculateSimpleMovingAverage();
    }
  }

  const calculateSimpleMovingAverage = () => {
    let twentyma = [];
    let fiftyma = [];
    let tenexpma = [];
    let twohndredma = [];
    twentyma = movingAvg.get_simple_ma(20, close);
    fiftyma = movingAvg.get_exponential_ma(20, close);
    tenexpma = movingAvg.get_exponential_ma(10, close);

    setLineData(ld => ({
      labels: ld.labels,
      datasets: [...ld.datasets, {
        label: '20ma',
        data: twentyma,
        fill: false,
        borderColor: "#70FF58",
        borderWidth: 0.5,
        pointRadius: 0.5
        }, {
        label: '20ema',
        data: fiftyma,
        fill: false,
        borderColor: "#B05022",
        pointRadius: 0.65,
        borderWidth: 0.5,
        }, {
        label: '10ema',
        data: tenexpma,
        fill: false,
        borderColor: "#1B01A4",
        pointRadius: 0.5,
        borderWidth: 0.5,
      }]
    }));
  }

  const showMarketTrend = () => {
    marketTrend(distDates, data);
  }

  return (
    <div className = "app"> 
      {/* <div className = "app__chart">
        <Chart 
          lineData = {lineData}
        />
        <Volume 
          barData = {barData}
        />
      </div>
      <button onClick = {calculateDistributionDays}>Calculate dist days</button>
      <div>
        Number of distribution Days {distDays ? distDays : ''} 
      </div>
      <button onClick = {showMarketTrend}>Show Market trend</button>
      */}
      <Router>
        <Switch>
          <Route exact path = "/">
            <Landing />
          </Route>
          <Route path = "/stock-finder">
            <StockFinder />
          </Route>
        </Switch>
      </Router>      
    </div>
  );
}

export default App;
