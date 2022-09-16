import {useState} from 'react'
import { Redirect as redirect} from "react-router-dom";



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
    <div>
      <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <label>
        Username: 
        <input type="text" name="userName" onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </form>
    <p style={{color: 'red'}}>{errors}</p>
    
    <p>No Login?</p>
    <button onClick={() => setClick(true)}>Sign up!</button>
    </div>
  )
  }

export default LoginForm