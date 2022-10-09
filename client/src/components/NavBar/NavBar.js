import React, {useState} from 'react'
import {useNavigate } from 'react-router-dom'
import './NavBar.css'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab'
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Search from './Search.js'

function NavBar({filter, onLogout, user, setRecipes, query, setQuery}) {

  const navigate = useNavigate()
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogout(e) {
    e.preventDefault()
    fetch("/logout", {method: 'DELETE'})
    .then(() => {
      onLogout()
      localStorage.removeItem("user")
    })
  }
    
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
      <Tabs onChange={handleChange} value={tabValue}>
        <Tab label="Home" onClick={() => navigate('/')}/>
        <Tab label="Recipes" onClick={() =>navigate('/recipes')}/>
        <Tab label="Favorite Meals" onClick={() =>navigate('/weeklyPlan')} />
      <Button
        id="menuBttn"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
          Welcome, {user.name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => navigate('/userProfile')}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        
      </Menu>
        <Search filter={filter} recipes={setRecipes} setRecipes={setRecipes} query={query} setQuery={setQuery}/>
      </Tabs>
    </Box>
    </div>
  )
}

export default NavBar