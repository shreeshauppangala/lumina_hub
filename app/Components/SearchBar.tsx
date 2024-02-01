import { Box, TextFieldProps, TextField, styled } from '@mui/material';
import React from 'react';
import { SearchIcon } from '../Assets/Icons';

const SearchWrapper = styled(Box)(({ theme }) => ({
  '.MuiTextField-root': {
    '.MuiInputBase-root': {
      borderRadius: theme.spacing(25),
      backgroundColor: theme.palette.common.white,
      '.MuiInputBase-input': {
        ...theme.typography.body1,
        padding: theme.spacing(10),
      },
    },
    '.MuiOutlinedInput-notchedOutline': {
      border: 0,
    },
  },
}));

type PropsI = TextFieldProps & {
  width?: string | number;
};

const SearchBar = (props: PropsI) => {
  const { placeholder = 'Search', InputProps, width } = props;
  return (
    <SearchWrapper width={width}>
      <TextField
        {...props}
        fullWidth
        hiddenLabel
        type='search'
        label=''
        placeholder={placeholder}
        InputProps={{
          startAdornment: <SearchIcon />,
          ...InputProps,
        }}
      />
    </SearchWrapper>
  );
};

export default SearchBar;
