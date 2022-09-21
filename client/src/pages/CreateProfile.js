import {useState} from 'react'
import CreateProfileForm from '../components/CreateProfile/CreateProfileForm'

function CreateProfile({user, setUser}) {

  return(
  <CreateProfileForm user={user} setUser={setUser}/>
  )
}

export default CreateProfile