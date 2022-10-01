import React from 'react'
import UserProfileHelper from '../components/UserProfile/UserProfileHelper'
import '../components/UserProfile/UserProfile.css'

function UserProfile({user}) {
  return (
    <div>
    <h2>User Profile</h2>
    {<UserProfileHelper user={user}/>}
    </div>
  )
}

export default UserProfile