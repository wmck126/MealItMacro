import {useState} from 'react'
import CreateProfileForm from '../components/CreateProfile/CreateProfileForm'
import '../components/CreateProfile/CreateProfileForm.css'

function CreateProfile({user, setUser}) {

  return(
    <div>
      <h2 id="title">Create your profile</h2>
      <CreateProfileForm user={user} setUser={setUser}/>
    </div>
  )
}

export default CreateProfile