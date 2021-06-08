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
} from '@material-ui/core';
import { searchStockInformation } from './helper/Apicall';
import SearchInput from './SearchInput';
import Moment from 'moment';
import './App.css';

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
  const [stockData, setStockData] = useState([{}]);

  const useStyles = makeStyles({
    table: {
      minWidth: 200,
    },
  });

  const classes = useStyles();

  useEffect(() => {
    //Fetch the Stock Name and Table Data(Actual Stock Information)
    const fetchTableData = () => {
      searchStockInformation(searchStock).then((response) => {
        //store stock name
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
      });
    };
    fetchTableData();
  }, [searchStock]);

  return (
    <div>
      <div className='header'>
        <h2>Infinix - Stock Tracker</h2>
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
          inputSearchStock={(stock) => {
            console.log(stock);
            setSearchStock(stock);
          }}
        />

        <div className='stock-name'>{searchStock}</div>
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
