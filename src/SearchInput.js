import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { fetchSearchQuery } from './helper/Apicall';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function FreeSoloCreateOptionDialog(props) {
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const [selectedStock, setSelectedStock] = useState('');
  const [searchList, setSearchList] = useState([]);

  const handleChange = (searchValue) => {
    const inputQuery = searchValue;
    fetchSearchQuery(inputQuery).then((res) => {
      var responseData = res.data;
      var arrayOfSearchQueries = responseData.data;
      var arrayofMatches = [];
      arrayOfSearchQueries.map((data, index) => {
        const objectOfNameAndSymbol = {
          name: data.name,
          symbol: data.symbol,
        };
        arrayofMatches.push(objectOfNameAndSymbol);
      });
      setSearchList(arrayofMatches);
    });
  };

  const handleClose = () => {
    setDialogValue({
      symbol: '',
      name: '',
    });

    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    symbol: '',
    name: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      symbol: dialogValue.symbol,
      name: parseInt(dialogValue.name, 10),
    });

    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        id='free-solo-dialog-demo'
        options={searchList.map((data) => data.name)}
        selectOnFocus
        onChange={(event, value) => {
          console.log(value);
          searchList.map((data, index) => {
            if (value === data.name) {
              props.inputSearchStock(data.symbol);
              props.inputStockName(data.name);
            }
          });
        }}
        clearOnBlur
        handleHomeEndKeys
        freeSolo
        renderInput={(params) => (
          <TextField
            onChange={(event) => {
              const searchValue = event.target.value;
              handleChange(searchValue);
            }}
            {...params}
            id='standard-basic'
            label='Search stock'
            variant='standard'
          />
        )}
      />
    </React.Fragment>
  );
}
