import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { fetchSearchQuery } from './helper/Apicall';
import Autocomplete, {
  
} from '@material-ui/lab/Autocomplete';

export default function FreeSoloCreateOptionDialog(props) {
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const [selectedStock, setSelectedStock] = useState('');
  const [searchList, setSearchList] = useState([]);

  const handleChange = (searchValue) => {
    const inputQuery = searchValue;
    fetchSearchQuery(inputQuery).then((res) => {
      var list = res.data.bestMatches;
      var arrayofMatches = [];
      if (res.data.bestMatches) {
        list.map((data, index) => {
          arrayofMatches.push(data['1. symbol']);
        });
        setSearchList(arrayofMatches);
      }
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
        options={searchList}
        selectOnFocus
        onChange={(event, value) => {
          props.inputSearchStock(value);
          console.log(value);
          setSelectedStock(value);
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
