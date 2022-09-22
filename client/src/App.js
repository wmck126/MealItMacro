import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, redirect,  } from "react-router-dom";
import SignupForm from "./components/Login/SignupForm";
import NavBar from "./components/NavBar/NavBar";
import { UserContext } from "./components/UserContext";
import CreateProfile from "./pages/CreateProfile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Recipes from "./pages/Recipes";
import UserProfile from "./pages/UserProfile";
;

function App() {
  const [user, setUser] = useState(null);
  console.log("This is user: ", user)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user")
    const redirection = () => redirect("/login")
    if(!loggedInUser){
      return redirection
    }
    else {
      const foundUser = JSON.parse(loggedInUser)
      console.log(foundUser)
      setUser(foundUser)
      redirect("/")
    }
  }, [])
  
  if (!user) return (<Login onLogin={setUser} />) 

  function handleLogout() {
    setUser(null)
  }

  function handleLogin(loggedIn) {
    setUser(loggedIn)
  }
  

  return (
    <div>
      <NavBar onLogout={handleLogout} user={user}/>
      <UserContext.Provider value ={user}>
        
          <Routes>
            <Route path="/" exact element={<Home />}/>
            <Route path="/login" element={<Login onLogin={handleLogin}/>}/>
            <Route path="/signup" element={<SignupForm onLogin={setUser} />}/>
            <Route path="/createProfile" element={<CreateProfile user={user} setUser={setUser}/>}/>
            <Route path='/userProfile' element={<UserProfile user={user} />} />
            <Route path='/recipes' element={<Recipes user={user} />} />
          </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;