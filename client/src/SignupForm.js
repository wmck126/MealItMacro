import {useState} from 'react'

function SignupForm({onLogin, setClick}) {
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
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => onLogin(user))
        .then(setClick(false))
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
          <label>
            Username: 
            <input type="text" name="userName" onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label>
            Password Confirmation:
            <input type="password" name="password" onChange={(e) => setPasswordConf(e.target.value)} />
          </label>
      </form>
      
      <button onClick={handleSubmit}>Submit</button>
      <p>Have an account?</p>
      <button onClick={() => setClick(false)}>Login</button>
    </div>
  )
}

export default SignupForm