import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { UserContext } from "./components/UserContext";
import CreateProfile from "./pages/CreateProfile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./Signup";

function App() {
  const [user, setUser] = useState(null);
  console.log("This is user: ", user)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user")
    if(!loggedInUser){
      Redirect("/login")
    }
    else {
      const foundUser = JSON.parse(loggedInUser)
      console.log(foundUser)
      setUser(foundUser)
      Redirect("/")
    }
  }, [])
  
  if (!user) return (<Login onLogin={setUser} />) 

  return (
    <div>
      <NavBar setUser={setUser} />
      <Router>
        <UserContext.Provider value ={user.name}>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup onLogin={setUser} />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/createProfile">
            <CreateProfile user={user} setUser={setUser}/>
          </Route>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;