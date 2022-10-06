import React, {useState} from 'react'
import Box from '@mui/material/Box';
import {TextField} from '@mui/material';

function Search({recipes, setRecipes, query, setQuery, filter}) {


  console.log(query)

  

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="Search Recipes" variant="standard" onChange={(e) => {
        filter()
        setQuery(e.target.value)}} />
      </Box>
  )
}

export default Search