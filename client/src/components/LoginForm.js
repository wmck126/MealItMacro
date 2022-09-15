import {useState, createContext} from 'react'


function LoginForm({onLogin, setClick}) {
  const [username, setUsername] = useState({name: '', auth: true})
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
          r.json().then((user) => onLogin(user))
          .then(alert("Successfully logged in!"))
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
    }

    
  return (
    <div>
      <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <label>
        Username: 
        <input type="text" name="userName" onChange={(e) => setUsername({name: e.target.value, auth: true})} />
      </label>
      <label>
        Password:
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
      </label>
    </form>
    <button onClick={handleSubmit}>Submit</button>
    <p>No Login?</p>
    <button onClick={() => setClick(true)}>Sign up!</button>
    </div>
  )
  }

export default LoginForm