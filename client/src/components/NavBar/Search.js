import React from 'react'
import Box from '@mui/material/Box';
import {TextField} from '@mui/material';
import "./NavBar.css"

function Search({setQuery, filter}) {

  

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      id="search"
    >
      <TextField id="standard-basic" label="Search Recipes" variant="standard" onChange={(e) => {
        filter()
        setQuery(e.target.value)}} />
      </Box>
  )
}

export default Search