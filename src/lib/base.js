export  const TIME_SERIES = "TIME_SERIES";
export const TECH_INDICATOR = "TECH_INDICATOR";
export const FUNDAMENTAL_DATA = "FUNDAMENTAL_DATA";
export const CRYPTO = "CRYPTO";

export const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July","Aug", "Sep", "Oct", "Nov", "Dec"];

const fundamentals = [
  {
    displayText: "Overview",
    qryString: "OVERVIEW"
  },
  {
    displayText: "Balance Sheet",
    qryString: "BALANCE_SHEET"
  },
  {
    displayText: "Income Statement",
    qryString: "INCOME_STATEMENT"
  },
  {
    displayText: "Cash Flow",
    qryString: "CASH_FLOW"
  },
  {
    displayText: "Earnings",
    qryString: "EARNINGS"
  }
]

const timeseries = [
  {
    displayText: "",
    qryString: ""
  }
];

export default {
  fundamentals,
  timeseries
}