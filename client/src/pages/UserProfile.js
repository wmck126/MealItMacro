import React from 'react'
import UserProfileHelper from '../components/UserProfile/UserProfileHelper'

function UserProfile({user}) {
  return (
    <>
    <h1>User Profile</h1>
    <p>{<UserProfileHelper user={user}/>}</p>
    </>
  )
}

export default UserProfile