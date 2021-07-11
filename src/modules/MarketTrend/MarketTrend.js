import React, { useState, useEffect } from 'react';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';

import './MarketTrend.css';
import generalMarketTrend from '../../lib/market-trend';
import nifty from "../../data/nifty_50.csv";

const UPTREND = "Uptrend";
const DOWNTREND = "Downtrend";
const UPTREND_UNDER_PRESSURE = "Uptrend under Pressure";
const RALLY_ATTEMPT = "Rally Attempt";

function MarketTrend({marketTrend}) {
  // const [data, setData] = useState(null);
  // const [distDates , setDistDates] = useState([]);

  // useEffect(() => {
  //   csv(nifty).then(response => setData(response));
  // });

  // useEffect(() => {
  //   if (data?.length) {
  //     let close = [];
  //     let volume = [];
  //     let sessions = [];
  //     let ddates = [];

  //     data.forEach(d => {
  //       close.push(parseFloat(d.Close));
  //       volume.push(parseFloat(d.Volume));
  //       sessions.push(d.Date);
  //     });

  //     for (let i = 1; i < close.length; i++) {
  //       let prcnt = 100 * (close[i] - close[i-1])/close[i-1];
  //       if (prcnt < -0.25 && volume[i] > volume[i-1]) {      
  //         ddates.push(sessions[i]);
  //       }
  //     }
  //     setDistDates(ddates);
  //   }
  // }, [data]);

  const showMarketTrend = () => {
    // let marketTrend = generalMarketTrend(distDates, data, 1);
    // marketTrend.reverse();
    return (
      <div className = "markettrend__list">
        {
          marketTrend?.map((mktrend, id) => {
            return (        
            <div key = {id} className = "markettrend__list-row">
              <p className = "markettrend__list-rowtext">{mktrend.trend} from</p>
              <p className = "markettrend__list-rowtext">{mktrend.startDate}</p>
              <p className = "markettrend__list-rowtext">to</p>
              <p className = "markettrend__list-rowtext">{mktrend.endDate ? mktrend.endDate : "Present Day"}</p>
              {mktrend.trend === UPTREND && <TrendingUpIcon className = "markettrend__upicon"/>} 
              {mktrend.trend === DOWNTREND && <TrendingDownIcon className = "markettrend__downicon"/>}
              {mktrend.trend === UPTREND_UNDER_PRESSURE && <TrendingUpIcon className = "markettrend__pressureicon"/>}
              {mktrend.trend === RALLY_ATTEMPT && <TrendingFlatIcon className = "markettrend__flaticon"/>}
            </div>
            );
          })
        }
      </div>
    )
  }

  return (
    <div className = "markettrend">
      <div className = "markettrend__header">
        <h1 className = "markettrend__header-text">General Market Trend</h1>
        <div className = "markettrend__desc"> 
        <p>
          The General Market Trend shows that how stocks are generally performing during a particular time interval.
          During this period a Majority of stocks Follow the given trend and investors 
          can get huge gains or stop crashing loss by following this trend.
        </p>
        </div>
      </div>
      <h2 className = "marketrrend__history">Market Trend History</h2>
      <div className = "markettrend__body">
         {showMarketTrend()}
      </div>
    </div>
  );
}

export default MarketTrend;