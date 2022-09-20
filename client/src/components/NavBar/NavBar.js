import React from 'react'

function NavBar({onLogout}) {
  function handleLogout(e) {
    e.preventDefault()
    fetch("/logout", {method: 'DELETE'})
    .then(() => {
      onLogout()
      localStorage.removeItem("user")
    })
  }

  return (
    <button onClick={handleLogout}>Logout</button>
  )
}

export default NavBar