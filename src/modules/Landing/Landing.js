import React , { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { csv } from 'd3';

import Card from '../../components/Card/Card';
import Chart from '../../components/Chart/Chart';
import Volume from '../../components/Volume/Volume';
import './Landing.css';

import d19 from '../../data/nifty_50.csv';
import sensex from '../../data/sensex_data.csv';
import night from '../../assets/STOCKNIGHT.jpeg';

import analysis from '../../assets/analysis.png';
import stockfinder from '../../assets/stock-finder.png';
import markettrend from '../../assets/market-trend.png';
import crypto from '../../assets/crypto.png';

const cardData = [
  {
    title: "Stock Finder",
    tagline: "BUY LOW, SELL HIGH",
    description: "Find your favourite stocks and know their fundamentals",
    path: "/stock-finder",
    image: stockfinder
  },
  {
    title: "General Market Trend",
    tagline: "THINK LONG TERM",
    description: "know about general market trend.",
    path: "/general-market-trend",
    image: markettrend
  },
  {
    title: "Analysis",
    tagline: "Algorithm Effeciency analysis",
    description: "know about general market trend.",
    path: "/analysis",
    image: analysis
  },
  {
    title: "Crypto currencies",
    tagline: "ERA OF DIGITAL CURRENCY",
    description: "crypto exchange rates",
    path: "/crypto-forex",
    image: crypto
  }
];

const indices = ["Nifty 50", "BSE Sensex", "Dow Jones"];

function Landing() {
  const history = useHistory();
  const [index, setIndex] = useState(indices[0]);
  const [indexData, setIndexData] = useState([]);
  const [close, setClose] = useState([]);
  const [volume, setVolume] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (index == indices[0]) {
      csv(d19)
      .then(data => {
        setIndexData(data);
      })
      .catch(err => console.log(err));
    } else if (index == indices[1]) {
      csv(sensex)
      .then(data => {
        setIndexData(data);
      })
    }
  });

  useEffect(() => {
    let close = [];
    let volume = [];
    let sessions = [];

    indexData.forEach(idxData => {
      volume.push(idxData.Volume);
      close.push(idxData.Close);
      sessions.push(idxData.Date);
    });
    setVolume(volume);
    setClose(close);
    setSessions(sessions);
  }, [indexData]);

  return (
    <div className = "landing">
       {/* <div className = "landing__banner">
         <img src = {night} alt = "background" />
       </div>
       <div className = "landing__heading">
         STOCKNIGHT
       </div> */}
       <div className = "landing__heading">
         STOCKNIGHT
       </div>
      <div className = "landing__body">
        <div className = "landing__card-container">
         {
            cardData.map((c, idx) => {
              return (<div key = {idx} onClick = {() => history.push(c.path)}>
                <Card
                  title = {c.title}
                  tagline = {c.tagline}
                  description = {c.description}
                  image = {c.image}
                />
              </div>);
            })
          }
        </div>
        <div className = "landing__indices">
          <div className = "landing__indices-heading">
            <h1> Major Indices </h1>
          </div>
          <div className = "landing__indices_list">
            {
              indices.map((element, key) => {
                return (
                  <div 
                    key = {key} 
                    className = {`landing__indices_list-item ${element === index ? "active-index": "inactive-index"}`} 
                    onClick = {() => setIndex(element)}>
                    <p className = "landing__indices_list-text">{element}</p>
                  </div>
                );
              })
            }
          </div>
          <div className = "landing__indices_chart">
            <Chart 
              sessions = {sessions}
              close = {close}
            />
          </div>
          <div className = "landing__indices_volume">
            {/* <Volume 
              sessions = {sessions}
              volume = {volume}
              close = {close}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;