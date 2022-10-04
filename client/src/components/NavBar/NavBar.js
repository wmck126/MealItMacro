import React, {useState} from 'react'
import {useNavigate } from 'react-router-dom'
import './NavBar.css'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab'
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {TextField} from '@mui/material';

function NavBar({onLogout, user}) {

  const navigate = useNavigate()
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [query, setQuery] = useState("")
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

  const showLogout = () => {
    if (user){
      return(
        <a className="nav-link" id="logoutBttn" onClick={handleLogout}>Logout</a>
      )
    }
    else {
      return(
        <a className="nav-link" id="logoutBttn" onClick={() =>navigate('/login')}>Login</a>
      )
    }}
    
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  function handleSubmit(e) {
    e.preventDefault()

    navigate("/recipequery")
  }

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
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        
      </Menu>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="Search Recipes" variant="standard" onChange={(e) => setQuery(e.target.value)} onSubmit={handleSubmit}/>
      </Box>
      </Tabs>
    </Box>
    </div>
  )
}

export default NavBar