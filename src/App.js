import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Landing from './modules/Landing/Landing';
import StockFinder from './modules/StockFinder/StockFinder';
import MarketTrend from './modules/MarketTrend/MarketTrend';
import CryptoForex from './modules/CryptoForex/CryptoForex';
import './App.css';

function App() {
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
            <MarketTrend />
          </Route>
          <Route path = "/crypto-forex">
            <CryptoForex />
          </Route>
        </Switch>
      </Router>      
    </div>
  );
}

export default App;
