import {useState} from 'react'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'


function Login({onLogin}) {
  const [clicked, setClick] = useState(false)
  const userContext = createContext({ name: '', auth: false})


  return (
    <div>
    {clicked ? <SignupForm onLogin={onLogin} setClick={setClick} /> : <LoginForm onLogin={onLogin} setClick={setClick}/>}
    </div>
  )
}

export default Login