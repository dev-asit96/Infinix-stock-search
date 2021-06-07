import axios from 'axios';

//asitdebata96@gmail.com
const apikey1 = process.env.REACT_APP_API1;
//asit.debata@hotmail.com
const apikey2 = '6RDOJU4Z6B1VM48H';
const symbol = 'RELIANCE';

console.log(apikey1);

const mainAPI = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}.BSE&outputsize=full&apikey=${apikey1}`;

//api call for search input suggestion
export const fetchSearchQuery = async (data) => {
  return await axios
    .get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${data}&apikey=${apikey1}`
    )
    .then((response) => {
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
  const searchApi = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock}&outputsize=full&apikey=${apikey1}`;
  return await axios.get(searchApi).then((res) => {
    return res;
  });
};
