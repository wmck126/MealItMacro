import { ClassNames } from "@emotion/react";
import { useEffect, useState } from "react";
import { Routes, Route, redirect,  } from "react-router-dom";
import SignupForm from "./components/Login/SignupForm";
import NavBar from "./components/NavBar/NavBar";
import { UserContext } from "./components/UserContext";
import CreateProfile from "./pages/CreateProfile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Recipes from "./pages/Recipes";
import UserProfile from "./pages/UserProfile";
import WeeklyMealPlan from "./pages/WeeklyMealPlan";
import _ from "lodash";
import './App.css'


function App() {
  const [user, setUser] = useState(null);
  const [userMeals, setUserMeals] = useState([])
  const [recipes, setRecipes] = useState([])
  const [query, setQuery] = useState("")


  useEffect(() => {
    const loggedInUser = localStorage.getItem("user")
    const redirection = () => redirect("/login")
    if(!loggedInUser){
      return redirection
    }
    else {
      const foundUser = JSON.parse(loggedInUser)
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
  
  function addUserMeals(meals){
    setUserMeals([...userMeals, {meals}])
  }

  const filterMeals =() => {
    recipes.filter(x => x.meal.name.toLowerCase().includes(query.toLowerCase()))
  }

  const mealsToDisplay = query ? recipes.filter((recipe) => recipe.meal.name.toLowerCase().includes(query.toLowerCase())) : recipes


  console.log("This is query:", )

  // function showRecipeFilter() {
    
  //   console.log("This is search:", search)
  // }

  

  return (
    <div>
      <NavBar onLogout={handleLogout} user={user}  query={query} setQuery={setQuery} filter={filterMeals}/>
      <UserContext.Provider value ={user}>
          <Routes>
            <Route path="/" exact element={<Home />}/>
            <Route path="/login" element={<Login onLogin={handleLogin}/>}/>
            <Route path="/signup" element={<SignupForm onLogin={setUser} />}/>
            <Route path="/createProfile" element={<CreateProfile user={user} setUser={setUser}/>}/>
            <Route path='/userProfile' element={<UserProfile user={user} />} />
            <Route path='/recipes' element={<Recipes user={user} addUserMeals={addUserMeals} recipes={mealsToDisplay} setRecipes={setRecipes}/>} />
            <Route path='/weeklyPlan' element={<WeeklyMealPlan user={user} userMeals={userMeals}/>} />
          </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;