const exchanges = ["BSE", "NSE"];

const symbols = [
  {
    scripCode: "532540",
    symbol: "TCS",
    name: "Tata Consultancy Services",
    industry: "IT Services & Consulting"
  },
  {
    scripCode: "500209",
    symbol: "INFY",
    name: "Infosys",
    industry: "IT Services & Consulting"
  },
  {
    scripCode: "500325",
    symbol: "RELIANCE",
    name: "Reliance Industries Limited",
    industry: "Conglomerate"
  },
  {
    scripCode: "500010",
    symbol: "HDFC",
    name: "HDFC",
    industry: "Finance (Housing)"
  },
  {
    scripCode: "500875",
    symbol: "ITC",
    name: "ITC Limited",
    industry: "Cigarettes & FMCG"
  },
  {
    scripCode: "500696",
    symbol: "HINDUNILVR",
    name: "Hindustan Unilever Limited",
    industry: "FMCG"
  },
  {
    scripCode: "500034",
    symbol: "BAJFINANCE",
    name: "Bajaj Finance",
    industry: "Finance (NBFC)"
  },
  {
    scripCode: "500112",
    symbol: "SBIN",
    name: "State Bank of India",
    industry: "Banking - Public"
  },
  {
    scripCode: "500510",
    symbol: "L&T",
    name: "Larsen & Toubro",
    industry: "Engineering & Construction"
  },
  {
    scripCode: "532281",
    symbol: "HCLTECH",
    name: "HCL Technologies",
    industry: "IT Services & Consulting"
  },
  {
    scripCode: "532500",
    symbol: "MARUTI",
    name: "Maruti Suzuki",
    industry: "Automobile"
  },
  {
    scripCode: "500520",
    symbol: "M&M",
    name: "Mahindra & Mahindra",
    industry: "Automobile"
  },
  {
    scripCode: "532538",
    symbol: "ULTRACEMCO",
    name: "UltraTech Cement",
    industry: "Cement"
  },
  {
    scripCode: "500790",
    symbol: "NESTLEIND",
    name: "Nestlé India",
    industry: "FMCG"
  },
  {
    scripCode: "532898",
    symbol: "POWERGRID",
    name: "Power Grid Corporation of India",
    industry: "Power generation/Distribution"
  },
  {
    scripCode: "532555",
    symbol: "NTPC",
    name: "NTPC",
    industry: "Power generation/Distribution"
  },
  {
    scripCode: "500312",
    symbol: "ONGC",
    name: "Oil and Natural Gas Corporation",
    industry: "Oil exploration and Production"
  },
  {
    scripCode: "",
    symbol: "ADANIPORTS",
    name: "Adani Ports",
    industry: "Infrastructure"
  },
  {
    scripCode: "",
    symbol: "BPCL",
    name: "Bharat Petroleum",
    industry: "	Energy - Oil & Gas"
  },
  {
    scripCode: "",
    symbol: "HEROMOTOCO",
    name: "Hero MotoCorp",
    industry: "Automobile"
  },
  {
    scripCode: "",
    symbol: "HINDALCO",
    name: "Hindalco Industries",
    industry: "Metals"
  },
  {
    scripCode: "",
    symbol: "IOC",
    name: "Indian Oil Corporation",
    industry: "Energy - Oil & Gas"
  },
  {
    scripCode: "",
    symbol: "JSWSTEEL",
    name: "JSW Steel",
    industry: "Metals"
  },
  {
    scripCode: "",
    symbol: "SHREECEM",
    name: "Shree Cements",
    industry: "Cement"
  },
  {
    scripCode: "",
    symbol: "TATACONSUM",
    name: "Tata Consumer Products",
    industry: "Consumer Goods"
  },
  {
    scripCode: "",
    symbol: "UPL",
    name: "United Phosphorus Limited",
    industry: "Chemicals"
  },
  {
    scripCode: "",
    symbol: "TATASTEEL",
    name: "Tata Steel",
    industry: "Metals"
  }
];

const adr = [
  {
    symbol: "INFY",
    name: "Infosys Adr",
    industry: "IT Services & Consulting",
    exchange: "NYSE"
  },
  {
    symbol: "IBN",
    name: "ICICI Bank",
    industry: "Banking - (Private)",
    exchange: "NYSE"
  },
  {
    symbol: "HDB",
    name: "HDFC Bank",
    industry: "Banking and Financial services",
    exchange: "NYSE"
  },
  {
    symbol: "TTM",
    name: "Tata Motors",
    industry: "Automobiles",
    exchange: "NYSE"
  },
  {
    symbol: "VEDL",
    name: "Vedanta Ltd",
    industry: "Mining",
    exchange: "NYSE"
  },
  {
    symbol: "WIT",
    name: "Wipro",
    industry: "IT Services & Consulting",
    exchange: "NYSE"
  },
  {
    symbol: "WNS",
    name: "WNS Holdings",
    industry: "Business process management",
    exchange: "NYSE"
  },
  {
    symbol: "RDY",
    name: "Dr. Reddy’s Labs ADR",
    industry: "Pharmaceutical",
    exchange: "NYSE"
  },
  {
    symbol: "MMYT",
    name: "MakeMyTrip",
    industry: "Travel & Leisure",
    exchange: "NASDAQ"
  },
  {
    symbol: "SIFY",
    name: "Sify",
    industry: "Information and communications technology",
    exchange: "NASDAQ"
  },
  {
    symbol: "YTRA",
    name: "Yatra Online",
    industry: "Travel & Leisure",
    exchange: "NASDAQ"
  },
  {
    symbol: "AZRE",
    name: "Azure Power Global",
    industry: "Utilities—Renewable",
    exchange: "NYSE"
  },
  {
    symbol: "VDTH",
    name: "Videocon D2H Limited",
    industry: "Satellite TV",
    exchange: "NASDAQ"
  },
];

export default {
  adr,
  symbols
};