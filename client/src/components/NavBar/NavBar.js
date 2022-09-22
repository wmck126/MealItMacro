import React from 'react'
import {useNavigate } from 'react-router-dom'
import './NavBar.css'
import Button from '@mui/material/Button'


function NavBar({onLogout, user}) {
  const navigate= useNavigate()
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
    return(<Button variant="text" id="logoutBttn" className='btn x btn-block mb-4' onClick={handleLogout}>Logout</Button>)
    }
    else(<Button variant="text" id="loginBttn" className='btn x btn-block mb-4' onClick={() =>navigate('/login')}>Login</Button>)
  }

  return (
    <nav class="navbar navbar-expand-lgg navbar-light bg-light">
      <a class='navbar-brand'>Mealit</a>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" onClick={() => navigate('/')} >Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" onClick={() =>navigate('/userProfile')}>U</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" onClick={() =>navigate('/recipes')}>Recipes</a>
      </li>
      </ul>
      </div>
    {showLogout()}
    </nav>
  )
}

export default NavBar