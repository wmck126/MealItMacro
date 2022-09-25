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
      return(
        <a class="nav-link" id="logoutBttn" onClick={handleLogout}>Logout</a>
      )
    }
    else {
      return(
        <a class="nav-link" id="logoutBttn" onClick={() =>navigate('/login')}>Login</a>
      )
    }}

  const showGreeting = () => {
    if (user){
      return (
        <p>Welcome, {user.name}</p>
      )
    }
  }

  return (
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class='navbar-brand'>Mealit</a>
        {showGreeting}
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
          <div class="collapse navbar-collapse" id="navbarNav">
          
            <div class="navbar-nav">
                <a class="nav-link" onClick={() => navigate('/')} >Home</a>
                <a class="nav-link" onClick={() =>navigate('/recipes')}>Recipes</a>
                <a class="nav-link" onClick={() =>navigate('/weeklyPlan')}>Weekly Meal Plan</a>
                <a class="nav-link" onClick={() =>navigate('/userProfile')}>User Profile</a>
              {showLogout()}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar