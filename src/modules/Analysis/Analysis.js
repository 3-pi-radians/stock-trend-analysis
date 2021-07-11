import React, {useEffect, useState} from 'react';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import Modal from 'react-modal';
import { Bar } from 'react-chartjs-2';
import { csv } from 'd3';

import nmetals from '../../data/nifty_metal.csv';
import nauto from '../../data/nifty_auto.csv';
import npharma from '../../data/nifty_pharma.csv';
import nbank from '../../data/nifty_bank.csv';
import nenergy from '../../data/nifty_energy.csv';
import nmetal from '../../data/nifty_metal.csv';

import { months } from '../../lib/base'

import './Analysis.css';
import { returnStatement } from '@babel/types';

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

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const analysisIndex = ["bank", "auto", "metals", "pharma"];

const barOptions = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: false
      }
    }]
  }
};

function Analysis({marketTrend}) {

  const [downtrend, setDowntrend] = useState([]);
  const [uptrend, setUptrend] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bankData, setBankData] = useState([]);
  const [pharmaData, setPharmaData] = useState([]);
  const [metalData, setMetalData] = useState([]);
  const [autoData, setAutoData] = useState([]);
  const [barLabels, setBarLabels] = useState([]);

  useEffect(() => {
    csv(nbank).then(response => setBankData(response));
    csv(nauto).then(response => setAutoData(response));
    csv(npharma).then(response => setPharmaData(response));
    csv(nmetal).then(response => setMetalData(response));

    return function cleanup() {
      setBankData([]);
      setAutoData([]);
      setPharmaData([]);
      setMetalData([]);
    }
  }, []);

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
  const openModal = (ele) => {
    setBarLabels([ele.startDate, ele.endDate]);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const formatDate = (date) => {
    let elements = date.split(" ");
    let mId = months.findIndex(mnth => elements[1] == mnth);
    mId++;
    if (mId < 10) mId = `0${mId}`;
    
    return `${elements[2]}-${mId}-${elements[0]}`;
  }

  const getBackgroundColor = (data) => {
    if (parseFloat(data[0]) > parseFloat(data[1])) return ['#339933', '#de32ae'];

    return ['#de32ae', '#339933']
  }

  const getBarData = (dataArr) => {
    let data = [];
    
    for (let i = dataArr.length - 1; i >= 0; i--) {
      if (data.length === 0) {
        if (formatDate(dataArr[i].Date) === barLabels[0]) data.push(dataArr[i].Close);
      } else if (data.length === 1) {
        if (formatDate(dataArr[i].Date) === barLabels[1]) data.push(dataArr[i].Close);
      }

      if (data.length === 2) break;
    }

    const bardata = {
      labels: barLabels,
      datasets: [{
        backgroundColor: getBackgroundColor(data),
        label: "Day close",
        data: data,
        borderWidth: 1,
        barPercentage: 0.3
      }]
    };
     return bardata;
  }

  const getModalContent = () => {
    return analysisIndex.map((sector, i) => {
      let barData = {};
      switch (sector) {
        case analysisIndex[0]: {
          barData = getBarData(bankData);
          break;
        }

        case analysisIndex[1]: {
          barData = getBarData(metalData);
          break;
        }

        case analysisIndex[2]: {
          barData = getBarData(autoData);
          break;
        }
        
        case analysisIndex[3] : {
          barData = getBarData(pharmaData);
          
          break;
        }
      }

      let change = 100 * (barData.datasets[0].data[1] - barData.datasets[0].data[0])/barData.datasets[0].data[0];
  
      return <div  key = {i} className = "analysis__modal-barchart">
        <Bar data = {barData} options = {barOptions} />
        {i === 0 && <p>Change in Bank Nifty {change.toFixed(2)} % </p>}
        {i === 1 && <p>Change in Nifty Metals {change.toFixed(2)} %</p>}
        {i === 2 && <p>Change in Nifty Auto {change.toFixed(2)} %</p>}
        {i === 3 && <p>Change in Nifty Pharma {change.toFixed(2)} %</p>}
      </div>
    });
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
                <div key = {i} className = "analysis__table-row" onClick = {() => openModal(ele)}>
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
                <div key = {i} className = "analysis__table-row" onClick = {() => openModal(ele)}>
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
        <Modal
          isOpen={isModalOpen}

          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="PRICE CHANGES"
        >
          <div className = "analysis__modal">
            
            <div className = "analysis__modal-heading">
            Change in various Nifty Indices from {barLabels[0]} to {barLabels[1]}
            </div>
            <div className = "analysis__modal-charts">
              {
                getModalContent()
              }
            </div>
          </div>
        </Modal>
    </div>
  );
}

export default Analysis;