import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { mainApi, searchStockAPI } from './helper/Apicall';


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

export default function DenseTable(props) {
  const [actualData, setActualData] = useState([]);
  const [stockSearch, setStockSearch] = useState('RELIANCE.BSE');
  
  useEffect(() => {
    setStockSearch(props.stock);
    searchStockAPI(stockSearch).then((response) => {
      var responseData = response.data;
      console.log(responseData);
      if (responseData == text1 || responseData == text2) {
        alert('Server error!');
        setStockSearch('RELIANCE.BSE');
      } else {
        console.log(responseData);
        var arrayData = [];
        var objectResponse = Object.entries(
          responseData['Time Series (Daily)']
        );
        objectResponse.map((data, index) => {
          if (index < 10) {
            var object = {
              date: data[0],
              open: data[1]['1. open'],
              close: data[1]['4. close'],
            };
            arrayData.push(object);
          }
        });
        console.log(arrayData);
        setActualData(arrayData);
      }
    });
  }, []);

  const useStyles = makeStyles({
    table: {
      minWidth: 200,
    },
  });

  const classes = useStyles();

  return (
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
          {actualData.map((data, index) => (
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
  );
}
