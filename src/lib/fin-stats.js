const balanceSheetReports = {
  totalAssets: "Total Assets",
  totalCurrentAssets: "Total Current Assets",
  currentDebt: "Current Debt",
  inventory: "inventory",
  goodwill: "goodwill",
  investments: "investments",
  shortTermInvestments: "Short Term Investments",
  longTermInvestments: "long Term Investments",
  totalLiabilities: "Total Liabilities",
  totalCurrentLiabilities: "Total Current Liabilities",
  currentAccountsPayable: "Current Accounts Payable",
  retainedEarnings: "Retained Earnings",
  totalShareholderEquity: "Total Shareholder Equity",
  treasuryStock: "Treasury Stock",
  commonStock: "Common Stock"
}


const incomeStatementReports = {
  grossProfit: "Gross Profit",
  totalRevenue: "Total Revenue",
  costOfRevenue: "Cost of Revenue",
  operatingIncome: "Operating Income",
  operatingExpenses: "Operating Expenses",
  researchAndDevelopment: "Research and Development",
  netInterestIncome: "Net Interest Income",
  interestIncome: "Interest Income",
  interestExpense: "Interest Expense",
  otherNonOperatingIncome: "Other Non Operating Income",
  incomeBeforeTax: "Income Before Tax",
  incomeTaxExpense: "Income Tax Expense",
  ebit: "ebit",
  ebitda: "ebitda",
  netIncome: "netIncome"
}

const cashFlowReports = {
  operatingCashflow: "Operating Cashflow",
  paymentsForOperatingActivities: "Payments for Operating Activities",
  proceedsFromOperatingActivities: "Proceeds From Operating Activities",
  changeInOperatingLiabilities: "Change in Operating Liabilities",
  changeInOperatingAssets: "change In Operating Assets",
  capitalExpenditures: "Capital Expenditures",
  changeInReceivables: "Change in Receivables",
  changeInInventory: "Change in Inventory",
  profitLoss: "Profit Loss",
  cashflowFromInvestment: "Cashflow From Investment",
  cashflowFromFinancing: "Cashflow From Financing",
  dividendPayout: "Dividend Payout",
  dividendPayoutCommonStock: "Dividend Payout CommonStock",
  changeInCashAndCashEquivalents: "Change in Cash and Cash equivalents",
  proceedsFromRepurchaseOfEquity: "Proceeds From Repurchase Of Equity"
}
const annualEarnings = {
  reportedEPS: "Reported EPS"
}
const quarterlyEarnings = {
  reportedEPS: "Reported Eps",
  estimatedEPS: "Estimated EPS",
  surprise: "surprise",
  surprisePercentage: "Surprise Percentage"
}

export const balanceSheet = {
  annualReports: balanceSheetReports,
  quarterlyReports: balanceSheetReports
};
export const incomeStats = {
  annualReports: incomeStatementReports,
  quarterlyReports: incomeStatementReports
}
export const cashFlow = {
  annualReports: cashFlowReports,
  quarterlyReports: cashFlowReports
}
export const earnings = {
  annualReports: annualEarnings,
  quarterlyReports: quarterlyEarnings
};
