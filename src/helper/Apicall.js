import axios from 'axios';

//Alpha advantage
//asitdebata96@gmail.com
const apikey1 = process.env.REACT_APP_API1;
//asit.debata@hotmail.com
const apikey2 = process.env.REACT_APP_API2;

// Market Stack APIs
//asitdebata96@gmail.com
const marketStackApikey1 = process.env.REACT_APP_MARKETSTACK_API1;
//asit_debata@hotmail.com
const marketStackApikey2 = process.env.REACT_APP_MARKETSTACK_API2;

const symbol = 'RELIANCE';

const mainAPI = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}.BSE&outputsize=full&apikey=${apikey1}`;

//api call for search input suggestion
export const fetchSearchQuery = async (query) => {
  // const api = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${apikey2}`;
  const api = `http://api.marketstack.com/v1/tickers?access_key=${marketStackApikey1}&search=${query}`;
  return await axios.get(api).then((response) => {
    return response;
  });
};

//api call for stock data
export const mainApi = async () => {
  return await axios.get(mainAPI).then((res) => {
    return res;
  });
};

export const searchStockInformation = async (stock) => {
  const api = `http://api.marketstack.com/v1/eod?access_key=${marketStackApikey1}&symbols=${stock}`;
  return await axios.get(api).then((res) => {
    return res;
  });
};
