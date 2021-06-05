import React , { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { csv } from 'd3';
import Card from '../../components/Card/Card';
import Chart from '../../components/Chart/Chart';
import Volume from '../../components/Volume/Volume';
import './Landing.css';

import d19 from "../../data/2018-2019.csv";

const cardData = [
  {
    title: "Stock Finder",
    tagline: "BUY LOW, SELL HIGH",
    description: "Find your favourite stocks and know their fundamentals",
    path: "/stock-finder"
  },
  {
    title: "General Market Trend",
    tagline: "THINK LONG TERM",
    description: "know about general market trend.",
    path: "/general-market-trend"
  },
  {
    title: "Forex",
    tagline: "",
    description: "Know about foren exchange rates",
    path: "/crypto-forex"
  },
  {
    title: "General Market Trend",
    tagline: "THINK LONG TERM",
    description: "know about general market trend.",
    path: "/crypto-forex"
  }
];

const indices = ["Nifty 50", "BSE Sensex", "Bank Nifty", "Nasdaq"];

function Landing() {
  const history = useHistory();
  const [index, setIndex] = useState(indices[0]);
  const [indexData, setIndexData] = useState([]);
  const [close, setClose] = useState([]);
  const [volume, setVolume] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    console.log("index changed");
    csv(d19)
    .then(data => {
      console.log(data);
      setIndexData(data);
    })
    .catch(err => console.log(err));
  }, [index]);

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
      <div className = "landing__header">
        <p className = "landing__header-title">PANTNAGAR SMITH</p>
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
                />
              </div>);
            })
          }
        </div>
        <div className = "landing__indices">
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
            <Volume 
              sessions = {sessions}
              volume = {volume}
              close = {close}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;