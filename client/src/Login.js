import {useState} from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'


function Login({onLogin}) {
  const [clicked, setClick] = useState(false)

  console.log(clicked)

  return (
    <div>
    {clicked ? <SignupForm onLogin={onLogin} setClick={setClick} /> : <LoginForm onLogin={onLogin} setClick={setClick}/>}
    </div>
  )
}

export default Login