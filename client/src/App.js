import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { UserContext } from "./components/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./Signup";

function App() {
  const [user, setUser] = useState(null);
  console.log("This is user: ", user)
  
  if (!user) return (<Login onLogin={setUser} />)

  return (
    
      <Router>
        <UserContext.Provider value ={user.username}>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/signup">
            <Signup onLogin={setUser} />
          </Route>
          <Route pat="/home">
            <Home />
          </Route>
        </UserContext.Provider>
      </Router>
    
  );
}

export default App;