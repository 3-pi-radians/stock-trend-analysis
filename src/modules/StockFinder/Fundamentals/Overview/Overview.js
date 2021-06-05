import React, { useState } from 'react';
import './Overview.css';

function Overview({stock}) {
  const [readLength, setReadLength] = useState(400);

  const getDescription = (desc) => {
    return (desc?.length > readLength ? desc.substr(0, readLength - 1) + "....." : desc);
  }

  const applyReadFunction = () => {
    let read = document.getElementById("overview__read");
    if (read.innerHTML == "(+)Read More") {
      setReadLength(2000);
      read.innerHTML = "(-)Read Less";
    } else {
      setReadLength(400);
      read.innerHTML = "(+)Read More"
    }
  }

  const formatNumber = (amount, type) => {
    switch (type) {
      case "currency": return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

      case "decimal": return new Intl.NumberFormat('en-US', {style: 'decimal'}).format(amount);
    }
  }

  return (
    <div className = "overview">
      <div className = "overview__heading">
        <h2 className = "overview__heading-text">Overview</h2>
      </div>
      <div className = "overview__basic">
        <div className = "overview__basic-left">
            <h3 className = "overview__basic-left-name">{stock.Name}: {stock.Symbol}</h3>
            <div className = "overview__basic-left-table">
              <div className = "overview__key-value-text">
                <p className = "overview__key-text">Exchange</p>
                <p className = "overview__key-text">Asset Type</p>
                <p className = "overview__key-text">Address</p>
              </div>
              <div className = "overview__key-value-text">
                <p className = "overview__value-text"> {stock.Exchange}</p>
                <p className = "overview__value-text"> {stock.AssetType}</p>
                <p className = "overview__value-text"> {stock.Address}</p>
              </div>
            </div>
          <div className = "overview__basic-left-desc">
            <div>{getDescription(stock?.Description)}<span id = "overview__read" onClick = {applyReadFunction}>(+)Read More</span></div>
          </div>
        </div>

        <div className = "overview__basic-right">
          <div className = "overview__basic-right-table">
            <div className = "overview__basic-right-table-content">
              <div className = "overview__key-value-text">
                <p className = "overview__key-text">Sector</p>
                <p className = "overview__key-text">Industry</p>
                <p className = "overview__key-text">Market Capitalization</p>
                <p className = "overview__key-text">Shares outstanding</p>
                <p className = "overview__key-text">Shares Float</p>
                <p className = "overview__key-text">Gross Profit TTM</p>
              </div>
              <div className = "overview__key-value-text">
                <p className = "overview__value-text">{stock.Sector}</p>
                <p className = "overview__value-text">{stock.Industry}</p>
                <p className = "overview__value-text">{formatNumber(stock.MarketCapitalization, "currency")}</p>
                <p className = "overview__value-text">{formatNumber(stock.SharesOutstanding, "decimal")}</p>
                <p className = "overview__value-text">{formatNumber(stock.SharesFloat, "decimal")}</p>
                <p className = "overview__value-text">{formatNumber(stock.GrossProfitTTM, "currency")}</p>
              </div>
            </div>
            <div className = "overview__basic-right-table-content">
              <div className = "overview__key-value-text">
                <p className = "overview__key-text">Fiscal Year End</p>
                <p className = "overview__key-text">Latest Quarter</p>
                <p className = "overview__key-text">Book Value</p>
                <p className = "overview__key-text">Beta</p>
                <p className = "overview__key-text">Percent Insiders</p>
                <p className = "overview__key-text">Percent Institutions</p>
              </div>
              <div className = "overview__key-value-text">
                <p className = "overview__value-text">{stock.FiscalYearEnd}</p>
                <p className = "overview__value-text">{stock.LatestQuarter}</p>
                <p className = "overview__value-text">{stock.BookValue}</p>
                <p className = "overview__value-text">{stock.Beta}</p>
                <p className = "overview__value-text">{stock.PercentInsiders}</p>
                <p className = "overview__value-text">{stock.PercentInstitutions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className = "overview__ratios">
        <h3 className = "overview__ratios-heading">
          Ratios
        </h3>
        <div className = "overview__ratios-table">
          <div className = "overview__ratios-table-content">
            <table id = "ratios-table">
              <tbody>
              <tr>
                <td>EBITDA</td>
                <td>{stock.EBITDA}</td>
              </tr>
              <tr>
                <td>Earning per Share (EPS)</td>
                <td>{stock.EPS}</td>
              </tr>
              <tr>
                <td>PE Ratio</td>
                <td>{stock.PERatio}</td>
              </tr>
              <tr>
                <td>Dividend per Share</td>
                <td>{stock.DividendPerShare}</td>
              </tr>
              <tr>
                <td>Dividend Yield</td>
                <td>{stock.DividendYield}</td>
              </tr>
              <tr>
                <td>Profit Margin</td>
                <td>{stock.ProfitMargin}</td>
              </tr>
              <tr>
                <td>Quarterly Earnings Growth (YOY)</td>
                <td>{stock.QuarterlyEarningsGrowthYOY}</td>
              </tr>
              <tr>
                <td>Quarterly Revenue Growth (YOY)</td>
                <td>{stock.QuarterlyRevenueGrowthYOY}</td>
              </tr>
              <tr>
                <td>Trailing PE</td>
                <td>{stock.TrailingPE}</td>
              </tr>
              <tr>
                <td>EV To EBITDA</td>
                <td>{stock.EVToEBITDA}</td>
              </tr>
              <tr>
                <td>EV To Revenue</td>
                <td>{stock.EVToRevenue}</td>
              </tr>
              <tr>
                <td>PEG Ratio</td>
                <td>{stock.PEGRatio}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className = "overview__ratios-table-content">
            <table id = "ratios-table">
              <tbody>
              <tr>
                <td>Revenue per Share TTM</td>
                <td>{stock.RevenuePerShareTTM}</td>
              </tr>
              <tr>
                <td>Operating Margin TTM</td>
                <td>{stock.OperatingMarginTTM}</td>
              </tr>
              <tr>
                <td>Return on Assets TTM</td>
                <td>{stock.ReturnOnAssetsTTM}</td>
              </tr>
              <tr>
                <td>Return on Equity TTM</td>
                <td>{stock.ReturnOnEquityTTM}</td>
              </tr>
              <tr>
                <td>Diluted EPS TTM</td>
                <td>{stock.DilutedEPSTTM}</td>
              </tr>
              <tr>
                <td>Price to Sales Ratio TTM</td>
                <td>{stock.PriceToSalesRatioTTM}</td>
              </tr>
              <tr>
                <td>Price to Book Ratio</td>
                <td>{stock.PriceToBookRatio}</td>
              </tr>
              <tr>
                <td>Forward Annual Dividend Rate</td>
                <td>{stock.ForwardAnnualDividendRate}</td>
              </tr>
              <tr>
                <td>Forward Annual Dividend Yield</td>
                <td>{stock.ForwardAnnualDividendYield}</td>
              </tr>
              <tr>
                <td>Payout Ratio</td>
                <td>{stock.PayoutRatio}</td>
              </tr>
              <tr>
                <td>Short Ratio</td>
                <td>{stock.ShortRatio}</td>
              </tr>
              <tr>
                <td>Short Percent Outstanding</td>
                <td>{stock.ShortPercentOutstanding}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className = "overview__misc">
        <h3 className = "overview__misc-heading">
          Additional Info
        </h3>
        <div className = "overview__misc-table">
        <div className = "overview__key-value-text">
        <p className = "overview__key-text">Analyst Target Price</p>
        <p className = "overview__key-text">Full-time Employees</p>
        <p className = "overview__key-text">Dividend Date</p>
        <p className = "overview__key-text">Ex Dividend Date</p>
        <p className = "overview__key-text">Last Split Factor</p>
        <p className = "overview__key-text">Last Split Date</p>
        <p className = "overview__key-text">52 Week High</p>
        <p className = "overview__key-text">52 Week Low</p>
        <p className = "overview__key-text">50 DayMoving Average</p>
        <p className = "overview__key-text">200 DayMoving Average</p>
        </div> 
        <div className = "overview__key-value-text">
        <p className = "overview__value-text">{formatNumber(stock.AnalystTargetPrice, "currency")}</p>
        <p className = "overview__value-text">{stock.FullTimeEmployees}</p>
        <p className = "overview__value-text">{stock.DividendDate}</p>
        <p className = "overview__value-text">{stock.ExDividendDate}</p>
        <p className = "overview__value-text">{stock.LastSplitFactor}</p>
        <p className = "overview__value-text">{stock.LastSplitDate}</p>
        <p className = "overview__value-text">{stock[`52WeekHigh`]}</p>
        <p className = "overview__value-text">{stock[`52WeekLow`]}</p>
        <p className = "overview__value-text">{stock[`50DayMovingAverage`]}</p>
        <p className = "overview__value-text">{stock[`200DayMovingAverage`]}</p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;