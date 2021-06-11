import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  withStyles,
  makeStyles,
} from '@material-ui/core/';
import Alert from '@material-ui/lab/Alert';
import { Offline, Online } from 'react-detect-offline';
import SearchInput from './SearchInput';
import Moment from 'moment';
import './App.css';
import axios from 'axios';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const App = () => {
  const [searchStock, setSearchStock] = useState('RELIANCE.XBOM');
  const [stockName, setStockName] = useState('RELIANCE INDUSTRIES LTD.');
  const [stockData, setStockData] = useState([{}]);
  const [mode, setMode] = useState('online');

  const useStyles = makeStyles({
    table: {
      minWidth: 200,
    },
  });

  const classes = useStyles();

  useEffect(() => {
    //Fetch the Stock Name and Table Data(Actual Stock Information)
    const fetchTableData = async () => {
      let apiUrl = `http://api.marketstack.com/v1/eod?access_key=${process.env.REACT_APP_MARKETSTACK_API1}&symbols=${searchStock}`;
      await axios
        .get(apiUrl)
        .then((response) => {
          //store stock name
          console.log('onlline');
          setMode('online');
          var responseData = response.data.data;
          var arrayData = [];
          responseData.map((data, index) => {
            if (index <= 10) {
              var object = {
                date: Moment(data.date).format('DD-MM-YYYY'),
                open: data.open.toFixed(2),
                close: data.close.toFixed(2),
              };
              arrayData.push(object);
            }
          });
          setStockData(arrayData);
          //Save the data into local storage
          localStorage.setItem('stock', JSON.stringify(arrayData));
        })
        .catch((error) => {
          setMode('offline');
          console.log(error);
          console.log('offline');
          let collection = localStorage.getItem('stock');
          setStockData(JSON.parse(collection));
        });
    };
    fetchTableData();
  }, [searchStock]);

  return (
    <div>
      <div className='header'>
        <h2>Infinix - Stock Tracker</h2>
      </div>

      <div>
        {mode === 'offline' ? (
          <Alert severity='warning'>You're in offline mode</Alert>
        ) : null}
      </div>

      <Box
        display='flex'
        justifyContent='center'
        marginBottom={3}
        p={1}
        flexDirection='column'
        alignItems='center'
      >
        <SearchInput
          inputStockName={(stockName) => setStockName(stockName)}
          inputSearchStock={(stock) => setSearchStock(stock)}
        />

        <div className='stock-name'>{stockName}</div>
      </Box>

      {/* Table goes here */}
      <Box marginX={2}>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size='small'
            aria-label='customized table'
          >
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell align='right'>Open</StyledTableCell>
                <StyledTableCell align='right'>Close</StyledTableCell>
              </StyledTableRow>
            </TableHead>

            <TableBody>
              {stockData.map((data, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component='th' scope='row'>
                    {data.date}
                  </StyledTableCell>

                  <StyledTableCell align='right'>{data.open}</StyledTableCell>
                  <StyledTableCell align='right'>{data.close}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default App;
