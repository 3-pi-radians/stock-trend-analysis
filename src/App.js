import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Landing from './modules/Landing/Landing';
import StockFinder from './modules/StockFinder/StockFinder';
import MarketTrend from './modules/MarketTrend/MarketTrend';
import Crypto from './modules/Crypto/Crypto';
import Loader from "./components/Loader/Loader";
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
            <Crypto />
          </Route>
          <Route path = "/loader">
            <Loader />
          </Route>
        </Switch>
      </Router>      
    </div>
  );
}

export default App;
