import {useState} from 'react'
import {useNavigate } from 'react-router-dom'
import './Signup.css'

function SignupForm({onLogin, setClick}) {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConf, setPasswordConf] = useState("")
  const [errors, setErrors] = useState("")
  const [loading, setLoading] = useState(false)
  const validUsername = /^.{5,}/
  const password6chars = /^.{6,}/
  const password1num = /^.*\d/
  const password1uppcase = /^.*[A-Z]/

  function handleSubmit(e) {
    e.preventDefault()
    if(password !== passwordConf){
      setErrors("Password confirmation does not match Password")
      setPasswordConf("")
      setTimeout(() => {
        setErrors("")
      }, 3000)
      return
    }
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
        r.json().then((err) => {
          setErrors(err.errors)
          setTimeout(() => {
            setErrors("")
          }, 3000)
        });
      }
    })
    
  }

  return (
    <div id="signupForm" className='container'>
      <h1 id="signupTitle">Signup</h1>
      <form onSubmit={handleSubmit} >

        <div className='form-outline mb-4'>
          <label className='form-label'>
            <input id="floatingInput1" placeholder="Username" className='form-control' type="text" name="userName" onChange={(e) => setUsername(e.target.value)} required/>
          
          <li id="userNameHelp" style={validUsername.test(username) ? null : {color: 'red'}} class="form-text">Username must be at least 5 characters</li>
          </label>
        </div>

        <div className='form-outline mb-4'>
          <label>
            <input id="floatingInput2" placeholder="Password" className='form-control' type="password" name="password"  onChange={(e) => setPassword(e.target.value)} required/>
          
          <li id="passHelp" style={password6chars.test(password) ? null : {color: 'red'}} class="form-text">Password must be at least 6 characters</li>
          <li id="passHelp" style={password1num.test(password) ? null : {color: 'red'}} class="form-text">Password must have at least 1 number</li>
          <li id="passHelp" style={password1uppcase.test(password) ? null : {color: 'red'}} class="form-text">Password must have at least 1 uppercase letter</li>
          </label>
        </div>

        <div className='form-outline mb-4'>
          <label>
            <input id="floatingInput2" placeholder="Password Confirmation" className='form-control' type="password" name="password" value={passwordConf} onChange={(e) => setPasswordConf(e.target.value)} required/>
          </label>
        </div>

        <button onClick={() => {handleSubmit(); setLoading(true)}} className="btn btn-primary btn-block mb-4">
          {loading  ? <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                      </div>
                    : "Submit"}</button>
      </form>
      <p style={{color: 'red'}}>{errors}</p>
      <p>Have an account?</p>
      <p onClick={() => setClick(false)} id="onClick">Login</p>
    </div>
  )
}

export default SignupForm