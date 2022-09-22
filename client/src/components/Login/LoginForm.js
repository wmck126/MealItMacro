import {useState} from 'react'
import {redirect} from "react-router-dom";
import Alert from '@mui/material/Alert'
import './Login.css'

function LoginForm({onLogin, setClick}) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState([])
  
  

  function handleSubmit(e) {
      e.preventDefault()
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }).then((r) => {
        if (r.ok) {
          r.json()
          .then(redirect("/"))
          .then((user) => {
            onLogin(user)
            localStorage.setItem("user", JSON.stringify(user))
          })
        } else {
          r.json().then((err) => setErrors(err.error));
        }
      });
    }

    
    
  return (
    <div id="loginForm" className='container'>
      <h1 id="loginTitle">Login</h1>
    <form onSubmit={handleSubmit}>
      <div className='form-outline mb-4'>
        <label className='form-label'>
          <input id="floatingInput1" placeholder="Username" className='form-control' type="text" name="userName" onChange={(e) => setUsername(e.target.value)} />
        </label>
      </div>
      <div className='form-outline mb-4'>
        <label className='form-label'>
          <input id="floatingInput2" placeholder="Password" className='form-control' type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
      </div>
      <button onClick={handleSubmit} className="btn btn-primary btn-block mb-4">Submit</button>
    </form>
    {(errors.length === 0) ? null : <Alert severity="error">{errors}</Alert>}
    
    <p>No Login? </p>
    <p onClick={() => setClick(true)} id="onClick">Sign up!</p> 
    
    </div>
  )
  }

export default LoginForm