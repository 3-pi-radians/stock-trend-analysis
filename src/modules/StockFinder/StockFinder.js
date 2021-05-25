import React, { useState, useEffect} from 'react';

import Card from '../../components/Card/Card';
import Chart from '../../components/Chart/Chart';
import Volume from '../../components/Volume/Volume';
import './StockFinder.css';

import lib from '../../lib';
import TimeSeries from './TimeSeries/TimeSeries';
import Fundamentals from './Fundamentals/Fundamentals';

const adr = lib.symbols.adr;
const apiData = lib.apiData;

const PERIODS = ["Daily", "Weekly", "Monthly"];
const Menu = ["Time Series", "Fundamentals"];
const region = ["US", "IN"];

function StockFinder() {
  const [locale, setLocale] = useState(region[0]);
  const [data, setData] = useState({});
  const [feature, setFeature] = useState(Menu[0]);
  const [duration, setDuration] = useState(PERIODS[1]);
  const [equity , setEquity] = useState(adr[0]);
  const [sessions, setSessions] = useState([]);
  const [close, setClose] = useState([]);
  const [volume, setVolume] = useState([]);
  const [indicators, setIndicators] = useState([]);

  useEffect(() => {
    const getApiData = async () => {

      let params = {
        timeOption: {
          period: `${duration.toUpperCase()}`,
        },
        locale: locale,
        category: "TIME_SERIES",
        symbol: `${equity.symbol}`
      };

      let result = await apiData(params);
      if (!(result instanceof Error)) {      
        let key = Object.keys(result)[1];
        setData(result[key]);
      }
    }

    getApiData();

  }, [duration]);

  useEffect(() => {
    let close = [];
    let volume = [];
    let date = [];

    let keys = Object.keys(data);
    let l = keys.length;

    for (let idx = 0; idx < l; idx++) {
      date[l-idx-1] = keys[idx];
      let value = data[keys[idx]];

      close[l-idx-1] = parseFloat(value["4. close"]);
      volume[l-idx-1] = parseFloat(value["5. volume"]);
    }

    setSessions(date);
    setVolume(volume);
    setClose(close);

  }, [data]);

  const selectIndicators = (e) => {
    if (e.target.checked) {
      setIndicators(ind => [...ind, e.target.value]);
    } else {
      setIndicators(indicators.filter(ind => ind !== e.target.value));
    }
  }

  return (
    <div className = "stockfinder">
      <div className = "stockfinder__header">
        <div className = "stockfinder__searchbox-container">
          <input className = "stockfinder__searchbox" type = "text" placeholder = "Stock Name or Code"/>
        </div>
        <div className = "stockfinder__locale">
          <p className = "stockfinder__locale-text">Locale: {locale}</p>
        </div>
      </div>
      <div className = "stockfinder__body">
        <div className = "stockfinder__title_bar">
          <div className = "stockfinder__title_bar-left">
          <p className = "stockfinder__title_bar-lefttxt">{equity.name}</p>
          <p className = "stockfinder__title_bar-lefttxt">: {equity.symbol}</p>
          </div>
            {
              close.length ?
              <div className = "stockfinder__title_bar-right">
                <p className = "stockfinder__title_bar-righttxt">Industry:  {equity.industry}</p>
                <p className = "stockfinder__title_bar-righttxt">Prev Close: {close[close.length -1]}</p>
                <p className = "stockfinder__title_bar-righttxt">Volume: {volume[volume.length-1]}</p>
                <p  className = "stockfinder__title_bar-righttxt">
                   % Chg: {100*(close[close.length -1]-close[close.length -2])/close[close.length -1]}
                </p>
              </div>
              :
              <div></div>
            }
        </div>
        <div className = "stockfinder__menu_bar">
          <div className = "stockfinder__menu-items">
            {
              Menu.map((menu, idx) => <p key = {idx} 
                className = {`stockfinder__menu-items-text ${menu === feature ? "stockfinder__menu-active": ""}`}
                onClick = {() => setFeature(menu)}> 
                  {menu}
                </p>)
            }
          </div>
        </div>
        {
          feature === Menu[0] && <TimeSeries equity = {equity} />
        }
        {
          feature === Menu[1] && locale === region[0] && <Fundamentals equity = {equity}/>
        }
        {/* {
          feature === Menu[2] && locale === region[0] && <Technical />
        } */}
        {/* {
          close.length ?
          <div className = "stockfinder__chart_container">
            <div className = "stockfinder__chart_container-graph">
              <div className = "stockfinder__chart_container-chart">
                <Chart 
                  close = {close}
                  sessions = {sessions}
                  indicators = {indicators}
                />
              </div>
              <div className = "stockfinder__chart_container-volume">
              <Volume
                close = {close}
                sessions = {sessions}
                volume = {volume}
              />
              </div>
            </div>
            <div className = "stockfinder__chart_container-options">
              <div className = "stockfinder__chart-options-indicators">
                <h2 className = "stockfinder__chart-indicators-heading">Indicators</h2>
                <div className = "stockfinder__chart-indicators-item">
                    <input type="checkbox"  value="20ma" onClick = {selectIndicators}/>
                    <label for="20ma"> 20 days moving average</label><br />
                </div>
                <div className = "stockfinder__chart-indicators-item">
                  <input type="checkbox" value="20ema" onClick = {selectIndicators}/>
                  <label for="20ema"> 20 days exponential moving average</label><br />
                </div>

                <div className = "stockfinder__chart-indicators-item">
                  <input type="checkbox" value="50ema" onClick = {selectIndicators}/>
                  <label for="50ema"> 50 days exponential moving average</label><br />
                </div>               
              </div>
              <div className = "stockfinder__chart-options-companies">
                <h3 className = "stockfinder__chart-companies-heading">
                  Select from list here
                </h3>
                <div className = "stockfinder__chart-companies-list">
                {
                  symbols.map((sym,idx) => {
                    return (
                      <div key = {idx} className = "stockfinder__chart-companies-listitem">
                        {sym.name}: {sym.symbol}
                      </div>
                    )
                  })
                }
                </div>
              </div>
            </div>
          </div>
          :
          <div className = "stockfinder__loading"></div>
        } */}
      </div>
    </div>
  )
};

export default StockFinder;