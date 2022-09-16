import {useState} from 'react'
import LoginForm from '../components/Login/LoginForm'
import SignupForm from '../components/Login/SignupForm'


function Login({onLogin}) {
  const [clicked, setClick] = useState(false)


  return (
    <div>
      {clicked ? <SignupForm onLogin={onLogin} setClick={setClick} /> : <LoginForm onLogin={onLogin} setClick={setClick}/>}
    </div>
  )
}

export default Login