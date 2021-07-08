import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { csv } from 'd3';

import Landing from './modules/Landing/Landing';
import StockFinder from './modules/StockFinder/StockFinder';
import MarketTrend from './modules/MarketTrend/MarketTrend';
import Crypto from './modules/Crypto/Crypto';
import Loader from "./components/Loader/Loader";
import Analysis from './modules/Analysis/Analysis';
import generalMarketTrend from './lib/market-trend';
import './App.css';

import nifty from './data/nifty_50.csv';

function App() {
  const [data, setData] = useState(null);
  const [distDates , setDistDates] = useState([]);
  const [trendArray, setTrendArray] = useState([]);

  useEffect(() => {
    csv(nifty).then(response => setData(response)).then(err => console.log(err));
  }, []);

  useEffect(() => {
    if (data?.length) {
      let close = [];
      let volume = [];
      let sessions = [];
      let ddates = [];

      data.forEach(d => {
        close.push(parseFloat(d.Close));
        volume.push(parseFloat(d.Volume));
        sessions.push(d.Date);
      });

      for (let i = 1; i < close.length; i++) {
        let prcnt = 100 * (close[i] - close[i-1])/close[i-1];
        if (prcnt < -0.25 && volume[i] > volume[i-1]) {      
          ddates.push(sessions[i]);
        }
      }
      setDistDates(ddates);
    }
  }, [data]);

  useEffect(() => {
    if (data !== null && distDates.length > 0) {
      let marketTrend = generalMarketTrend(distDates, data, 1);
      marketTrend.reverse();
  
      setTrendArray(marketTrend);
    }
  }, [distDates])

  return (
    <div className = "app"> 
      <Router>
        <Switch>
          <Route exact path = "/">
            <Landing />
          </Route>
          <Route path = "/stock-finder">
            <StockFinder />
          </Route>
          <Route path = "/general-market-trend">
            <MarketTrend marketTrend = {trendArray} />
          </Route>
          <Route path = "/crypto-forex">
            <Crypto />
          </Route>
          <Route path = "/loader">
            <Loader />
          </Route>
          <Route path = "/analysis">
            <Analysis marketTrend = {trendArray} />
          </Route>
        </Switch>
      </Router>      
    </div>
  );
}

export default App;
