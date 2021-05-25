import React, { useState, useEffect } from 'react';
import './FinancialStatements.css';

import { months } from '../../../../lib/base';
import {
  balanceSheet,
  incomeStats,
  cashFlow,
  earnings
} from '../../../../lib/fin-stats';
function FinancialStatements({ stock, fundamental }) {
  const [numOfColumns, setNumOfQuarter] = useState(12);
  const [annual, setAnnual] = useState([]);
  const [quarterly, setQuarterly] = useState([]);
  const [annualReportKeys, setAnnualReportKeys] = useState([]);
  const [quarterlyReportKeys, setQuarterlyReportKeys] = useState([]);
  const [annualReportValues, setAnnualReportValues] = useState([]);
  const [quarterlyReportValues, setQuarterlyReportValues] = useState([]);

  useEffect(() => {
    let key = Object.keys(stock);
    setAnnual(stock[key[1]]);
    setQuarterly(stock[key[2]]);

    return function cleanup() {
      setAnnualReportKeys([]);
      setQuarterlyReportKeys([]);
      setAnnualReportValues([]);
      setQuarterlyReportValues([]);
    }
  }, [stock, fundamental]);

  useEffect(() => {
    let report = {};
    switch (fundamental.qryString) {
      case "BALANCE_SHEET": {
        report.annualReport = balanceSheet.annualReports;
        report.quarterlyReport = balanceSheet.quarterlyReports;
        break;
      }
      case "INCOME_STATEMENT": {
        report.annualReport = incomeStats.annualReports;
        report.quarterlyReport = incomeStats.quarterlyReports;
        break;
      }
      case "CASH_FLOW": {
        report.annualReport = cashFlow.annualReports;
        report.quarterlyReport = cashFlow.quarterlyReports;
        break;
      }
      case "EARNINGS": {
        report.annualReport = earnings.annualReports;
        report.quarterlyReport = earnings.quarterlyReports;
        break;
      }
    }
    setAnnualReportKeys(Object.keys(report.annualReport));
    setQuarterlyReportKeys(Object.keys(report.quarterlyReport));
    setAnnualReportValues(Object.values(report.annualReport));
    setQuarterlyReportValues(Object.values(report.quarterlyReport));
  }, [fundamental.qryString])

  const getTableHeader = (duration) => {
    let head = (
      duration?.map((q, idx) => {
        if (idx < numOfColumns) {
          let date = q.fiscalDateEnding.split('-');
          let mId = parseInt(date[1]) - 1;
          return <th key = {idx}>{`${months[mId]}-${date[0]}`}</th>
        }
      })
    );

    return head;
  }

  const getTableRows = (key, idx, durationArr, duration) => {
    let tableRef, txt;

    if (duration === "quarterly") {
      tableRef = document.getElementById("financialstatement-table1");
      txt = document.createTextNode(`${quarterlyReportValues[idx]}`);
    } else {
      tableRef = document.getElementById("financialstatement-table2");
      txt = document.createTextNode(`${annualReportValues[idx]}`);
    }

    let newRow = tableRef.insertRow(-1);
    let newCell = newRow.insertCell(0);
    newCell.appendChild(txt);

    for (let i = 0; i < durationArr?.length; i++) {
      if (i < numOfColumns) {
        newCell = newRow.insertCell(i + 1);
        let element = durationArr[i];
        txt = document.createTextNode(`${element[key]}`);
        newCell.appendChild(txt);
      } else break;
    }
  }

  const moreRowsToRender = (len, id) => {
    let table = document.getElementById(id);
    if (table) {
      return (table.rows.length <= len);
    }
    return false;
  }

  return (
    <div className="financialstatement">
      <div className="financialstatement__heading">
        <h2 className="financialstatement__heading-text">{fundamental.displayText}</h2>
      </div>

      <div className="financialstatement__reports">
        <h2 className="financialstatement__reports-heading">
          Quarterly Report
        </h2>
        <div className="financialstatement__reports-table">
          <div className="financialstatement__reports-table-content">
            <table id="financialstatement-table1">
              <thead>
                <tr>
                  <th>Quarter</th>
                  {getTableHeader(quarterly)}
                </tr>
              </thead>
              <tbody>
                { moreRowsToRender(quarterlyReportKeys.length, "financialstatement-table1") && 
                  quarterlyReportKeys.map((key, idx) => {
                    return <React.Fragment key = {idx}>
                      {getTableRows(key, idx, quarterly, "quarterly")}
                    </React.Fragment>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="financialstatement__reports">
        <h2 className="financialstatement__reports-heading">
          Annual Report
        </h2>
        <div className = "financialstatement__reports-table">
          <div className = "financialstatement__reports-table-content">
            <table id="financialstatement-table2">
              <thead>
                <tr>
                  <th>Annual</th>
                  {getTableHeader(annual)}
                </tr>
              </thead>
              <tbody>
                { moreRowsToRender(annualReportKeys.length, "financialstatement-table2") && 
                  annualReportKeys.map((key, idx) => {
                    return <React.Fragment key = {idx}>
                      {getTableRows(key, idx, annual, "annual")}
                    </React.Fragment>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinancialStatements;