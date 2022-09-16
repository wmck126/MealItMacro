import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { UserContext } from "./components/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./Signup";

function App() {
  
  const [user, setUser] = useState(null);
  console.log("This is user: ", user)

  useEffect(() => {
    fetch("/me")
    .then((r) => {
      if(r.ok){
        r.json().then((user) =>console.log(user))
      }
    })
  }, [])
  
  
  if (!user) return (<Login onLogin={setUser} />) 
  
    
    
  

  return (
    <div>
      <NavBar setUser={setUser} />
      <Router>
        <UserContext.Provider value ={user.username}>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup onLogin={setUser} />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;