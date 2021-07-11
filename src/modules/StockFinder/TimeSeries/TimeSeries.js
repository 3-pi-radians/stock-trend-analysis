import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import Chart from '../../../components/Chart/Chart';
import Volume from '../../../components/Volume/Volume'
import Loader from '../../../components/Loader/Loader';
import "./TimeSeries.css";
import fetchMarketData from '../../../lib/api-data';

const Periods = ["Daily", "Weekly", "Monthly"];

function TimeSeries({equity, locale, getRequiredStats}) {
  const [duration, setDuration] = useState(Periods[0]);
  const [data, setData] = useState({});
  const [close, setClose] = useState([]);
  const [volume, setVolume] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [dataPoints, setDataPoints] = useState(70);
  const [indicators, setIndicators] = useState([]);

  useEffect(() => {
    const getApiData = async() => {
      let params = {
        timeOption: {
          period: `${duration.toUpperCase()}`,
          option: "ADJUSTED"
        },
        category: "TIME_SERIES",
        symbol: equity.symbol,
        locale: locale,
        exchange: equity.exchange
      }

      let response = await fetchMarketData(params); //  this functions prepare the final URL
      if (!(response instanceof Error)) {      
        let key = Object.keys(response)[1];
        setData(response[key]);
      }
    }

    getApiData();

    return function cleanup() {
      setData({});
      setDataPoints(70);
    }

  }, [duration, equity]);

  useEffect(() => {
    if (data && Object.entries(data).length) {
      let close = [];
      let volume = [];
      let date = [];

      let keys = Object.keys(data); 

      if (keys.length) {
        for (let idx = 0; idx < dataPoints; idx++) {
          date[dataPoints-idx-1] = keys[idx];
          let value = data[keys[idx]];
          
          close[dataPoints-idx-1] = parseFloat(value["5. adjusted close"]);
          volume[dataPoints-idx-1] = parseFloat(value["6. volume"]);
        }
         
        getRequiredStats({
          prevClose: close[dataPoints-1],
          preVolume: volume[dataPoints-1],
          closeChange: [close[dataPoints-1], close[dataPoints-2]]
        });

        setSessions(date);
        setVolume(volume);
        setClose(close);
      }
    }


    return function cleanup() {
      setSessions([]);
      setVolume([]);
      setClose([]);
    }
  }, [dataPoints, data]);

  const toggleIndicatorDropdown = (iconId, dropdownId) => {
    let dropdown = document.getElementById(dropdownId);
    let icon = document.getElementById(iconId);

    if (dropdown.classList.length === 2) {
      icon.classList.remove("timeseries__indicators-list-itemicon-open");
      dropdown.classList.remove("timeseries__indicators-dropdown-active");
    } else {
      icon.classList.add("timeseries__indicators-list-itemicon-open");
      dropdown.classList.add("timeseries__indicators-dropdown-active");
    }
  }

  const performIndicatorBtnFunction = (e,iconId, dropdownId) => {
    let icon = document.getElementById(iconId);
    let dropdown = document.getElementById(dropdownId);

    icon.classList.remove("timeseries__indicators-list-itemicon-open");
    dropdown.classList.remove("timeseries__indicators-dropdown-active");

    if (e.target.innerHTML === 'save') {
      let indicatorAlreadyPresent = false;
      let indicator = {
        text: dropdownId.split('-')[1].toUpperCase(),
        period: parseInt(dropdown.children[1].value),
        color: dropdown.children[4].value
      }
      
      for (let i = 0; i < indicators.length; i++) {
        if (indicators[i].text === indicator.text && indicators[i].period === indicator.period) {
          indicatorAlreadyPresent = true;
          break;
        }
      }
      if (!indicatorAlreadyPresent) {
        setIndicators(ind => [...ind, indicator]);
      }
    } 
  }

  const clearIndicatorItem = (label) => {
    setIndicators(indicators.filter(indicator => `${indicator.text}-${indicator.period}` !== label));
  }

  const getSliderMax = () => {
    if (data) {
      return `${Object.keys(data).length}`;
    }
  }

  return (
    <div className = "timeseries">
      <div className = "app__menu-bar">
      <div className = "app__menu-bar-items">
          {
            Periods.map((prd, idx) => <p 
              key = {idx} 
              onClick = {() => setDuration(prd)}
              className = {`app__menu-bar-items-text ${prd === duration ? "app__menu-bar-items-active" : ""}`}
              >
              {prd}
            </p>)
          }
        </div>
      </div>
      <div className = "timeseries__body">
        {
          close?.length > 0?
          <div className = "timeseries__chart_container">
            <div className = "timeseries__chart_container-chart">
              <Chart 
                close = {close}
                sessions = {sessions}
                indicators = {indicators}
              />
            </div>
            <div className = "timeseries__chart_container-volume">
              <Volume
                close = {close}
                sessions = {sessions}
                volume = {volume}
              />
            </div>
          </div> 
        :
        <div className = "timeseries__loader">
          <Loader />
        </div>
        }
        <div className = "timeseies__chart_options">
          <div className = "timeseries__chart-indicators">
            <h3 className = "timeseries__chart-indicators-heading">
              Technical Indicators
            </h3>
            <div className = "timeseries__indicators-list">
              <div className = "timeseries__indicators-list-item">
              <div className = "timeseries__indicators-list-itemrow">
                <div className = "timeseries__indicators-list-itemname">
                  Simple Moving Average
                </div>
                <div  className = "timeseries__indicators-list-itemicon" id = "indicator-sma-addicon" 
                  onClick = {(e) => toggleIndicatorDropdown("indicator-sma-addicon", "indicator-sma")}>
                  <AddCircleIcon />
                </div>
                </div>
                <div id = "indicator-sma" className = "timeseries__indicators-dropdown">
                  <label>Length</label>
                  <input type = "number" min = "1" defaultValue = "10"/><br />
                  <label>colour</label>
                  <input type = "color" />
                  <div className = "timeseries__indicators-dropdown-btns">
                    <button className = "timeseries__indicators-dropdown-btncancel"
                      onClick = {(e) => performIndicatorBtnFunction(e, "indicator-sma-addicon", "indicator-sma")}>
                        cancel
                    </button>
                    <button className = "timeseries__indicators-dropdown-btnsave" 
                      onClick = {(e) => performIndicatorBtnFunction(e, "indicator-sma-addicon", "indicator-sma")}>
                        save
                    </button>
                  </div>
                </div>
              </div>
              <div className = "timeseries__indicators-list-item">
              <div className = "timeseries__indicators-list-itemrow">
                <div className = "timeseries__indicators-list-itemname">
                  Exponential Moving Average
                </div>
                <div  className = "timeseries__indicators-list-itemicon" id = "indicator-ema-addicon" 
                onClick = {(e) => toggleIndicatorDropdown("indicator-ema-addicon" , "indicator-ema")}>
                  <AddCircleIcon />
                </div>
                </div>
                <div id = "indicator-ema" className = "timeseries__indicators-dropdown">
                  <label>Length</label>
                  <input type = "number" min = "1" defaultValue = "10" /><br />
                  <label>colour</label>
                  <input type = "color" />
                  <div className = "timeseries__indicators-dropdown-btns">
                    <button className = "timeseries__indicators-dropdown-btncancel"
                      onClick = {(e) => performIndicatorBtnFunction(e, "indicator-ema-addicon", "indicator-ema")}>
                        cancel
                    </button>
                    <button className = "timeseries__indicators-dropdown-btnsave" 
                      onClick = {(e) => performIndicatorBtnFunction(e, "indicator-ema-addicon", "indicator-ema")}>
                        save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className = "timeseries__datapoints-range">
              <label>Number of DataPoints: {dataPoints}</label><br />
              <input type = "range"
                min = "50"
                max = {getSliderMax()}
                value = {dataPoints}
                onChange = {e => setDataPoints(e.target.value)}
                step = "10"
              />
            </div>
            <div className = "timeseries__applied-indicators">
              {
                indicators.length ?
                <>
                  <h3 className = "timeseries__applied-indicators-heading">Indicators Applied</h3>
                  <div className = "timeseries__applied-indicators-list">
                    {
                      indicators.map((ind, idx) => {
                        return (
                          <div key = {idx} className = "timeseries__applied-indicators-listitem">
                            <div className = "timeseries__applied-indicators-itemtext">{ind.text} {ind.period}</div>
                            <div className = "timeseries__applied-indicators-itemcolor" style={{backgroundColor: `${ind.color}`}}></div>
                            <div className = "timeseries__applied-indicators-itemicon"><SettingsIcon /></div>
                            <div className = "timeseries__applied-indicators-itemicon" 
                              onClick = {() => clearIndicatorItem(`${ind.text}-${ind.period}`)}><CloseIcon /></div>
                          </div>
                        );
                      })
                    }
                  </div>
                </>
                : null
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeSeries;