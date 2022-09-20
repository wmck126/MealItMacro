import {useState} from 'react'
import {useNavigate } from 'react-router-dom'
import './Signup.css'

function SignupForm({onLogin, setClick}) {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConf, setPasswordConf] = useState("")
  const [errors, setErrors] = useState("")

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
        })
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    })
    .then(navigate("createProfile"))
    .then(setClick(false))
    .then(console.log("Redirecting"));
  }

  return (
    <div id="signupForm" className='container'>
      <h1 id="signupTitle">Signup</h1>
      <form onSubmit={handleSubmit} >
        <div className='form-outline mb-4'>
          <label className='form-label'>
            <input id="floatingInput1" placeholder="Username" className='form-control' type="text" name="userName" onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div>
        <div className='form-outline mb-4'>
          <label>
            <input id="floatingInput" placeholder="Password" className='form-control' type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <div className='form-outline mb-4'>
          <label>
            <input id="floatingInput" placeholder="Password Confirmation" className='form-control' type="password" name="password" onChange={(e) => setPasswordConf(e.target.value)} />
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