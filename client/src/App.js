import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./Signup";

function App() {
  const [user, setUser] = useState(null);

  
  if (!user) return (<Login onLogin={setUser} />)

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup onLogin={setUser} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;