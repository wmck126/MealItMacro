import {useEffect, useState} from 'react'
import {useNavigate } from 'react-router-dom'
import './Signup.css'

function SignupForm({onLogin, setClick}) {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConf, setPasswordConf] = useState("")
  const [errors, setErrors] = useState("")
  const validUsername = /^.{5,}/
  const password6chars = /^.{6,}/
  const password1num = /^.*\d/
  const password1uppcase = /^.*[A-Z]/

  function handleSubmit(e) {
    e.preventDefault()
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        username,
        password,
        password_confirmation: passwordConf,
      }),
    })
    .then((r) => {
      if (r.ok) {
        r.json()
        .then((user) => {
          onLogin(user)
          localStorage.setItem("user", JSON.stringify(user))
          setClick(false)
          navigate("createProfile")
        })
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    })
    
  }

  return (
    <div id="signupForm" className='container'>
      <h1 id="signupTitle">Signup</h1>
      <form onSubmit={handleSubmit} >

        <div className='form-outline mb-4'>
          <label className='form-label'>
            <input id="floatingInput1" placeholder="Username" className='form-control' type="text" name="userName" onChange={(e) => setUsername(e.target.value)} />
          
          <li id="userNameHelp" style={validUsername.test(username) ? null : {color: 'red'}} class="form-text">Username must be at least 5 characters</li>
          </label>
        </div>

        <div className='form-outline mb-4'>
          <label>
            <input id="floatingInput2" placeholder="Password" className='form-control' type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
          
          <li id="passHelp" style={password6chars.test(password) ? null : {color: 'red'}} class="form-text">Password must be at least 6 characters</li>
          <li id="passHelp" style={password1num.test(password) ? null : {color: 'red'}} class="form-text">Password must have at least 1 number</li>
          <li id="passHelp" style={password1uppcase.test(password) ? null : {color: 'red'}} class="form-text">Password must have at least 1 uppercase letter</li>
          </label>
        </div>

        <div className='form-outline mb-4'>
          <label>
            <input id="floatingInput2" placeholder="Password Confirmation" className='form-control' type="password" name="password" onChange={(e) => setPasswordConf(e.target.value)} />
          </label>
        </div>

        <button onClick={handleSubmit} className="btn btn-primary btn-block mb-4">Submit</button>
      </form>
      <p style={{color: 'red'}}>{errors}</p>
      <p>Have an account?</p>
      <p onClick={() => setClick(false)} id="onClick">Login</p>
    </div>
  )
}

export default SignupForm