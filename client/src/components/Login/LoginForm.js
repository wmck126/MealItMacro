import {useState} from 'react'
import {redirect} from "react-router-dom";
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
    <div id="loginLayout">
    <div id="loginForm" className='container'>
      <h1 id="logo">Mealit</h1>
      <h2 id="loginTitle">Login</h2>
    <form onSubmit={handleSubmit}>
      <div className='form-outline mb-4'>
        <label className='form-label'>
          <input id="floatingInput1" placeholder="Username" className='form-control' type="text" name="userName" onChange={(e) => setUsername(e.target.value)} required/>
        </label>
      </div>
      <div className='form-outline mb-4'>
        <label className='form-label'>
          <input id="floatingInput2" placeholder="Password" className='form-control' type="password" name="password" onChange={(e) => setPassword(e.target.value)} required/>
        </label>
      </div>
      <button onClick={handleSubmit} className="btn btn-primary btn-block mb-4">Submit</button>
    </form>
    <p style={{color: 'red'}}>{errors}</p>
    
    <p>No Login? </p>
    <p onClick={() => setClick(true)} id="onClick">Sign up!</p> 
    </div>
    <img src="https://images.unsplash.com/photo-1576021182211-9ea8dced3690" id="loginPic" alt="recipe" />
    </div>
  )
  }

export default LoginForm