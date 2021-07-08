import React, {useEffect, useState} from 'react';
import './Analysis.css';

import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import Modal from 'react-modal';

const trendData = [
  {
    trend: "CONFIRMED UPTREND",
    text: "Market is currently showing strength. It is perfect time to buy new equities"
  },
  {
    trend: "Uptrend under Pressure",
    text: "Market is currently showing some signs of disorientation. Investors need to excercise caution."
  },
  {
    trend: "Downtrend",
    text: "Market is going through correction. It is time avoid any new purchase and decrease the portfolio."
  },
  {
    trend: "Rally Attempt",
    text: "Market is trying to overcome the downtrend. Not an ideal time to buy"
  }
];

function Analysis({marketTrend}) {

  const [downtrend, setDowntrend] = useState([]);
  const [uptrend, setUptrend] = useState([]);

  const getMajorDowntrends = () => {
    let down = [];
    let sortedArr = [];
    

    down = marketTrend.filter(ele => ele.trendId === -1);

    for (let i = 0; i < down.length -1; i++) {
      let diff = down[i].trendEnd - down[i].trendStart;
      let perc = 100 * diff/down[i].trendStart;

      if (diff < 0) {
        sortedArr.push({
          startDate: down[i].startDate,
          endDate: down[i].endDate,
          change: diff,
          perChange: perc,
          startPrice: down[i].trendStart
        });
      }
    }

    sortedArr.sort((a, b) => a.perChange - b.perChange);
    return sortedArr;
  }

  const getMajorUptrends = () => {
    let up  = [];
    let sortedArr = [];
    
    up = marketTrend.filter(ele => ele.trendId === 1);
    for (let i = 0; i < up.length - 1; i++) {
      let diff = up[i].trendEnd - up[i].trendStart;
      let perc = 100 *  diff/up[i].trendStart;

      if (diff > 0) {
        sortedArr.push({
          startDate: up[i].startDate,
          endDate: up[i].endDate,
          startPrice: up[i].trendStart,
          change: diff,
          perChange: perc
        });
      }
    }

    sortedArr.sort((a, b) => b.perChange - a.perChange);
    return sortedArr;
  }

  useEffect(() => {
    let up = getMajorUptrends();
    let down = getMajorDowntrends();

    console.log(up);

    setUptrend(up);
    setDowntrend(down);
  }, []);

  const showCurrentTrend = () => {
    if (marketTrend[0].trendId === 1) {
      return (
        <>
          <div className = "analysis__trend-symbol" style = {{backgroundColor: "#2e7d32"}}>
            <TrendingUpIcon />
          </div>
          <div className = "analysis__trend-text">
          <div className = "anasysis__trend-text-heading">{trendData[0].trend}</div>
            <p>{trendData[0].text}</p>
          </div>
        </>
      )
    } else if (marketTrend[0].trendId === 0) {
      return (
        <>
          <div className = "analysis__trend-symbol" style = {{backgroundColor: "#FDD835"}}>
            <TrendingUpIcon />
          </div>
          <div className = "analysis__trend-text">
          <div className = "anasysis__trend-text-heading">{trendData[1].trend}</div>
            <p>{trendData[1].text}</p>
          </div>
        </>
      )

    } else if (marketTrend[0].trendId === -1) {
      return (
        <>
          <div className = "analysis__trend-symbol" style = {{backgroundColor: "#ff5722"}}>
            <TrendingFlatIcon />
          </div>
          <div className = "analysis__trend-text">
          <div className = "anasysis__trend-text-heading">{trendData[2].trend}</div>
            <p>{trendData[2].text}</p>
          </div>
        </>
      )

    } else if (marketTrend[0].trendId === 0.5) {
      return (
        <>
          <div className = "analysis__trend-symbol" style = {{backgroundColor: "#9e9e9e"}}>
            <TrendingDownIcon />
          </div>
          <div className = "analysis__trend-text">
            <div className = "anasysis__trend-text-heading">{trendData[3].trend}</div>
            <p>{trendData[3].text}</p>
          </div>
        </>
      )

    }
  }

  const openModal = () => {

  }

  return (
    <div className = "analysis">
      <div className = "analysis__trend">
        {
          showCurrentTrend()
        }
      </div>
      <div className = "analysis__table">
        <div className = "analysis__table-heading">
          Major Uptrend Analysis
        </div>
        <div className = "analysis__table-row analysis__table-head">
          <p>Start Date</p>
          <p>End Date</p>
          <p>Value Change</p>
          <p>Growth %</p> 
        </div>
        <div className = "analysis__table-body">
          {
            uptrend?.map((ele, i) => {
              return (
                <div key = {i} className = "analysis__table-row" onClick = {() => openModal()}>
                  <p>{ele.startDate}</p>
                  <p>{ele.endDate}</p>
                  <p>{ele.change.toFixed(3)}</p>
                  <p>{ele.perChange.toFixed(3)}</p>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className = "analysis__table">
        <div className = "analysis__table-heading">
          Major Downtrend Analysis
        </div>
        <div className = "analysis__table-row analysis__table-head">
          <p>Start Date</p>
          <p>End Date</p>
          <p>Value Change</p>
          <p>Fall %</p> 
        </div>
        <div className = "analysis__table-body">
          {
            downtrend?.map((ele, i) => {
              return (
                <div key = {i} className = "analysis__table-row">
                  <p>{ele.startDate}</p>
                  <p>{ele.endDate}</p>
                  <p>{ele.change.toFixed(3)}</p>
                  <p>{ele.perChange.toFixed(3)}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Analysis;