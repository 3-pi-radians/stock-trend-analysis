import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import Search from '../../components/Search/Search';
import Chart from '../../components/Chart/Chart';
import Loader from '../../components/Loader/Loader';
import './Crypto.css';

import currency from '../../lib/crypto-forex';
import fetchApiData from '../../lib/api-data'

import { CRYPTO } from '../../lib/base';

const cryptocurrencies = currency.cryptocurrencies;
const physicalcurrencies = currency.physicalcurrencies;

function Crypto() {
  const [asset, setAsset] = useState(cryptocurrencies[0]);
  const [toMarket, setToMarket] = useState(physicalcurrencies[0]);
  const [data, setData] = useState(null);
  const [close, setClose] = useState([]);
  const [sessions, setsessions] = useState([]);
  const [filteredAssets, setFilteredAsset] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getData = async() => {
      let response = {};
      let params  = {
        category: CRYPTO,
        requestFunction: "DIGITAL_CURRENCY_DAILY",
        symbol: asset.symbol,
        market: toMarket.symbol,
      };
      
      response = await fetchApiData(params);

      if (!(response instanceof Error)) {
        let key = Object.keys(response)[1]
        setData(response[key]);
    }
  }

  getData();

  return function cleanup() {
    setData(null)
  }
  }, [asset, toMarket]);
  

  useEffect(()=> {
    if (data && Object.entries(data).length !== 0) {
      let dates = Object.keys(data);
      let len = dates.length;

      let closeKey = Object.keys(data[dates[0]])[6];
      let ssn = [];
      let cls = [];

      for (let i = 0; i < len; i++) {
        ssn[len-i-1] = dates[i];
        cls[len-i-1] = data[dates[i]][closeKey];
      }

      setsessions(ssn);
      setClose(cls);
    }

    return function cleanup() {
      setClose([]);
      setsessions([]);
    }
  }, [data]);

  const changeCurrentAsset = (ast) => {
    setAsset(ast);
  }

  const filterSearchText = (text) => {
    if (text !== "") {
      setFilteredAsset(cryptocurrencies.filter(ast => ast.name.toLowerCase().includes(text.toLowerCase()) || 
      ast.symbol.toLowerCase().includes(text.toLowerCase())));
    } else {
      setFilteredAsset([]);
    }
  }

  const changePhysicalCurrency = () => {
    const dropdown = document.getElementById("physical-currency");
    let index = dropdown.value.split("-")[1];

    setToMarket(physicalcurrencies[index]);
  }

  return (
    <div className = "crypto">
      <div className = "app__header">
        <div className = "app__header-icon" onClick = {() => history.push("/")}>
          <KeyboardBackspaceIcon />
        </div>
        <div className = "app__searchbox-container">
          <Search 
            changeCurrentAsset = {changeCurrentAsset}
            filteredAssets = {filteredAssets}
            placeholder = {"Enter Cryto name or symbol"}
            filterSearchText = {filterSearchText}
          />
        </div>
        <div className = "crypto__locale">
          {toMarket.symbol}
        </div>
      </div>
      <div className = "crypto__body">
        <div className = "crypto__titlebar">
          <p className = "crypto__titlebar-heading">{asset.name}: {asset.symbol}</p>
          <p className = "crypto__titlebar-text">&nbsp;to &nbsp;</p>
          <div className = "crypto__titlebar-country">
            <select className = "crypto__titlebar-dropdown" id = "physical-currency" onChange = {changePhysicalCurrency}>
              {
                physicalcurrencies.map((phc, i) => <option key = {i} value = {`currency_option-${i}`}>
                  {phc.name}
                </option>)
              }
            </select>

          </div>
        </div>
        <div className = "crypto__body-container">
          <div className = "crypto__left">
            <div className = "crypto__leftlist">
              {cryptocurrencies.map((crypto, i) => crypto.symbol !== asset.symbol && 
               <div key  = {i} className = "crypto__leftlist-row" onClick = {() => setAsset(crypto)}>
                <p className = "crypto__leftlist-rowitem">{crypto.name}</p>
                <p className = "crypto__leftlist-rowitem">{crypto.symbol}</p>
              </div>)}
            </div>
          </div>
          <div className = "crypto__right">
            {
              close?.length  ?
                <div className = "crypto__right-chart">
                <Chart
                  close = {close}
                  sessions = {sessions}
                  showLabel = {true}
                />
              </div>
              :
              <Loader />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Crypto;