import React from 'react'

function LoginForm() {
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
          r.json().then((user) => onLogin(user));
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
    }
  return (
  <div>
      <form onSubmit={handleSubmit}>
          <label>
            Username: 
            <input type="text" name="userName" onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="text" name="password" onChange={(e) => setPassword(e.target.value)} />
          </label>
      </form>
      <button onClick={handleSubmit}>Submit</button>
  </div>
  )
}

export default LoginForm