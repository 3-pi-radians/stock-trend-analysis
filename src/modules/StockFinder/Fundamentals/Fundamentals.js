import React, { useState, useEffect } from 'react';
import Overview from './Overview/Overview';
import FinancialStatements from './FinancialStatements/FinancialStatements';
import Loader from '../../../components/Loader/Loader'

import "./Fundamentals.css";

import { FUNDAMENTAL_DATA } from '../../../lib/base';
import lib from "../../../lib";

const getApiData = lib.apiData;
const adr = lib.symbols.adr;
const FUNDAMENTALS = lib.base.fundamentals;

function Fundamentals({equity}) {
  const [data, setData] = useState({});
  const [fundamental, setFundamental] = useState(FUNDAMENTALS[0]);

  useEffect(() => {
    setData({});
  }, [equity]);

  useEffect(() => {
    const key = fundamental.qryString;
    const getFundamentalData = async () => {
      let result = {};
      let params = {
        category: FUNDAMENTAL_DATA,
        requestFunction: fundamental.qryString,
        symbol: equity.symbol
      }
      let response = await getApiData(params);

      if (!(response instanceof Error)) {
        result[key] = response;
        setData({
          ...data,
          ...result
        });
        // console.log("data fetched..", result);
      } 
    }
    if (!data[key]) {
      getFundamentalData();   
    }
  },[fundamental, data]);

  return (
    <div className = "fundamentals">
      <div className = "app__menu-bar">
        <div className = "app__menu-bar-items">
          {
            FUNDAMENTALS.map((fun, idx) => <p 
              key = {idx} 
              onClick = {() => setFundamental(fun)}
              className = {`app__menu-bar-items-text ${fun.displayText === fundamental.displayText ? "app__menu-bar-items-active" : ""}`}
              >
              {fun.displayText}
            </p>)
          }
        </div>
          {
            data[fundamental?.qryString] ? 
            <div className = "fundamentals__body">
            { 
              data["OVERVIEW"] && fundamental.qryString === "OVERVIEW" && <Overview stock = {data["OVERVIEW"]} />
            }
            {
              data["BALANCE_SHEET"] && fundamental.qryString === "BALANCE_SHEET" && <FinancialStatements stock = {data["BALANCE_SHEET"]} 
              fundamental = {fundamental}/>
            }
            {
              data["INCOME_STATEMENT"] && fundamental.qryString === "INCOME_STATEMENT" && <FinancialStatements stock = {data["INCOME_STATEMENT"]}
              fundamental = {fundamental} />
            }
            {
              data["CASH_FLOW"] && fundamental.qryString === "CASH_FLOW" && <FinancialStatements stock = {data["CASH_FLOW"]} 
              fundamental = {fundamental}/>
            }
            {
              data["EARNINGS"] && fundamental.qryString === "EARNINGS" && <FinancialStatements stock = {data["EARNINGS"]}
               fundamental = {fundamental}/>
            }
  
          </div>
          : 
          <div className = "fundamentals__loader">
            <Loader />
          </div>

          }
      </div>
    </div>
  );
}

export default Fundamentals;