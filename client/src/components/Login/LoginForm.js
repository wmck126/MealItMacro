import {useState} from 'react'
import { Redirect as redirect} from "react-router-dom";
import './Login.css'

function LoginForm({onLogin, setClick}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState([])
  console.log(errors)
  

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
          r.json().then((user) => {
            onLogin(user)
            localStorage.setItem("user", JSON.stringify(user))
          })
          .then(redirect("/"))
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
    <p style={{color: 'red'}}>{errors}</p>
    
    <p>No Login? <a onClick={() => setClick(true)} id="onClick">Sign up!</a></p> 
    
    </div>
  )
  }

export default LoginForm