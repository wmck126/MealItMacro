import React from 'react'
import CreateProfileForm from '../components/CreateProfileForm'

function CreateProfile({user, setUser}) {
  return (
    <CreateProfileForm user={user} setUser={setUser}/>
  )
}

export default CreateProfile