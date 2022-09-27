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
        <a className="nav-link" id="logoutBttn" onClick={handleLogout}>Logout</a>
      )
    }
    else {
      return(
        <a className="nav-link" id="logoutBttn" onClick={() =>navigate('/login')}>Login</a>
      )
    }}

  const showGreeting = () => {
      return (
        <p>Welcome, {user.name}</p>
      )
  }

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className='navbar-brand'>Mealit</a>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
          <div className="collapse navbar-collapse" id="navbarNav"><br/>
          {showGreeting()}
            <div className="navbar-nav">
                <a className="nav-link" onClick={() => navigate('/')} >Home</a>
                <a className="nav-link" onClick={() =>navigate('/recipes')}>Recipes</a>
                <a className="nav-link" onClick={() =>navigate('/weeklyPlan')}>Weekly Meal Plan</a>
                <a className="nav-link" onClick={() =>navigate('/userProfile')}>User Profile</a>
              {showLogout()}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar