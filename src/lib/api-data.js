/*OUTPUT SIZE
  By default, outputsize=compact. 
  Strings compact and full are accepted with the following specifications: compact returns only the latest 100 data points; 
  full returns the full-length time series of 20+ years of historical data. 
  The "compact" option is recommended if you would like to reduce the data size of each API call.
*/
import axios from 'axios';
import {
  TIME_SERIES,
  TECH_INDICATOR,
  FUNDAMENTAL_DATA,
  CRYPTO
} from './base';

const getTiemSeries = (timeOption) => {
  let timeseries = `TIME_SERIES_${timeOption.period}`;
  if (timeOption.option) {
    timeseries += `_${timeOption.option}`;
  }

  return timeseries;
};
const getBaseURL = () => {
  let rand = Date.now();
  if (rand%10 < 5) {
    return `${process.env.REACT_APP_API_BASE_URL_1}`;
  } else {
    return `${process.env.REACT_APP_API_BASE_URL_2}`;
  }
}
const createApiUrl = (params) => {
  let url= `${process.env.REACT_APP_API_BASE_URL_1}`;

  switch (params.category) {

    case TIME_SERIES: {
      const extraParams = params.extraParams;
      const timeSeries = getTiemSeries(params.timeOption);
       
      url +=  `function=${timeSeries}&symbol=${params.symbol}`;
      if (params.locale !== 'US') {
        url += `.${params.exchange}`
      } 
      
      if (!extraParams) return url;
    
      for (let [key, value] of Object.entries(extraParams)) {
        url += `&${key}=${value}`;
      }
      return url;
    };

    case FUNDAMENTAL_DATA: {
      url += `function=${params.requestFunction}&symbol=${params.symbol}`;
      return url;
    };

    case TECH_INDICATOR: {
      break;
    } 
    case CRYPTO: {
      break;
    }
  }
};

const getApiData = async (params) => {
  try {
    let url = createApiUrl(params);
    let response = await axios.get(url);
    let result = response.data;
    console.log(result);
    if (result.Note)  throw new Error(result.Note);

    return result;
  } catch (error) {
    return error;
  }
};

export default getApiData;