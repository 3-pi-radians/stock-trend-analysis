import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import Search from '../../components/Search/Search';
import TimeSeries from './TimeSeries/TimeSeries';
import Fundamentals from './Fundamentals/Fundamentals';
import './StockFinder.css';

import symbols from '../../lib/symbols';

const indianEquity = symbols.indianEquity;
const usEquity = symbols.usEquity;
const scrips = [...usEquity, ...indianEquity];

const Menu = ["Time Series", "Fundamentals"];
const region = ["US", "IN"];

function StockFinder() {
  const [locale, setLocale] = useState(region[0]);
  const [feature, setFeature] = useState(Menu[0]);
  const [equity , setEquity] = useState(usEquity[18]);
  const [stats, setStats] = useState(null);
  const [peers, setPeers] = useState([]);
  const history = useHistory();
  const [searchStocks, setSearchStocks] = useState([]);

  useEffect(() => {
    setPeers(scrips.filter(scrp => scrp.industryCode === equity.industryCode && scrp.symbol !== equity.symbol));
  }, [equity]);

  const getRequiredStats = (data) => {
    setStats({
      prevClose: data.prevClose,
      preVolume: data.preVolume,
      closeChange: (data.closeChange[0] - data.closeChange[1])/data.closeChange[1]
    });
  }

  const formatNumber = (amount, type) => {
    switch (type) {
      case "currency": return new Intl.NumberFormat('en-US', { style: type, currency: equity.currency }).format(amount);

      case "decimal": return new Intl.NumberFormat('en-US', {style: type}).format(amount);
    }
  }

  const filterSearchText = (text) => {
    if (text !== "") {
      setSearchStocks(scrips.filter(scrp => scrp.name.toLowerCase().includes(text.toLowerCase()) || 
      scrp.symbol.toLowerCase().includes(text.toLowerCase())));
    } else {
      setSearchStocks([]);
    }
  }

  const changeCurrentAsset = (asset) => {
    setStats(null);
    setEquity(asset);
    setLocale(asset.locale);
  }

  return (
    <div className = "stockfinder">
      <div className = "stockfinder__header">
        <div className = "stockfinder__header-icon" onClick = {() => history.push("/")}>
          <KeyboardBackspaceIcon />
        </div>
        <div className = "stockfinder__searchbox-container">
          <Search filterSearchText = {filterSearchText} 
            placeholder = "Stock Name or Symbol" 
            filteredAssets = {searchStocks}
            changeCurrentAsset = {changeCurrentAsset}/>
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
          {
            stats ?
            <>
              <p className = "stockfinder__title_bar-lefttxt stockfinder__title_bar-leftclose">&nbsp; {formatNumber(stats.prevClose, "currency")}</p>
              <p className = {`stockfinder__title_bar-lefttxt 
                ${stats?.closeChange > 0 ? `stockfinder__positive_close` : `stockfinder__negative_close` }`}>
                 ({formatNumber(100 * stats.closeChange, "decimal") }%)
              </p>
            </>
            : null
          }
          </div>
            {
              stats ?
              <div className = "stockfinder__title_bar-right">
                <p className = "stockfinder__title_bar-righttxt">Industry:  {equity.industry}</p>
                <p className = "stockfinder__title_bar-righttxt">Volume: {stats.preVolume}</p>
              </div>
              : null
            }
        </div>
        <div className = "stockfinder__menu_bar">
          <div className = "stockfinder__menu-items">
            <p  className = {`stockfinder__menu-items-text ${Menu[0] === feature ? "stockfinder__menu-active": ""}`}
              onClick = {() => setFeature(Menu[0])}>
               {Menu[0]}
            </p>
            <p  className = {`stockfinder__menu-items-text ${Menu[1] === feature ? "stockfinder__menu-active": ""}`}
              onClick = {() => setFeature(Menu[1])}>
               {locale === region[0] && Menu[1]}
            </p>
          </div>
        </div>
        {
          feature === Menu[0] && <TimeSeries equity = {equity} locale = {locale} getRequiredStats = {getRequiredStats}/>
        }
        {
          feature === Menu[1] && locale === region[0] && <Fundamentals equity = {equity}/>
        }
        {
          feature === Menu[0] ? 
          <div className = "stockfinder__peers">
            <h3 className = "stockfinder__peers-heading">
              Related Stocks
            </h3>
            {
              peers?.map((prs, idx) => {
                return (
                  <div key = {idx} className = "stockfinder__peers-row" onClick = {() => changeCurrentAsset(prs)}>
                    <p className = "stockfinder__peers-rowtext">{prs.name}</p>
                    <p className = "stockfinder__peers-rowtext">{prs.symbol}</p>
                    <p className = "stockfinder__peers-rowtext">{prs.exchange}</p>
                    <p className = "stockfinder__peers-rowtext">{prs.industry}</p>
                  </div>
                )
              })
            }
          </div> : null
        }
      </div>
    </div>
  )
};

export default StockFinder;