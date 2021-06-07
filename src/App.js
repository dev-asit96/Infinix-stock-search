import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { fetchSearchQuery, searchStockInformation } from './helper/Apicall';
import SearchInput from './SearchInput';
import Table from '@material-ui/core/Table';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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
  //const [stock, setStock] = useState('');
  const [searchStock, setSearchStock] = useState('RELIANCE.BSE');
  const [stockData, setStockData] = useState([]);
  //const [stockSearch, setStockSearch] = useState('RELIANCE.BSE');

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
        // setStock(response.data['Meta Data']['2. Symbol']);
        var responseData = response.data;
        console.log(responseData);
        //Create an empty array
        var arrayData = [];
        var objectResponse = Object.entries(
          responseData['Time Series (Daily)']
        );
        //Object creation
        objectResponse.map((data, index) => {
          if (index < 10) {
            var object = {
              date: data[0],
              open: data[1]['1. open'],
              close: data[1]['4. close'],
            };
            console.log(object);
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
