import React from 'react'

function NavBar({setUser}) {
  function handleLogout(e) {
    e.preventDefault()
    fetch("/logout", {method: 'DELETE'})
    .then(() => {
      setUser(null)
      localStorage.removeItem("user")
    })
  }

  return (
    <button onClick={handleLogout}>Logout</button>
  )
}

export default NavBar