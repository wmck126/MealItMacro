import React from 'react'
import UserProfileHelper from '../components/UserProfile/UserProfileHelper'

function UserProfile({user}) {
  return (
    <div>
    <h1>User Profile</h1>
    {<UserProfileHelper user={user}/>}
    </div>
  )
}

export default UserProfile