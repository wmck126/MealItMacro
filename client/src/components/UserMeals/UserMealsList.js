import React, { useEffect, useState } from 'react'
import "./UserMealsList.css"

function UserMealsList({user}) {

  const [newUser, setNewUser] = useState([])
  useEffect(() => {
    fetch(`/users/${user.id}`)
    .then(r => r.json())
    .then(user => setNewUser(user))
  }, [])

  
  return (
    <div className="row row-cols-1 row-cols-md-6 g-5" id="card-group">
    { newUser.meals === undefined ? null 
    : newUser.meals.map((m) => {
      console.log(m)
      let dishType = m.dish_type.replace(/[\[\]"]+/g, '')
      let mealType = m.meal_type.replace(/[\[\]"]+/g, '')
    
    return(
      <div key={m.id} className="card" id="card">
        <img src={m.image_url} className="card-img-top" alt="m image"/>
        <div className="card-body">
        <h5 className="card-title">{m.name}</h5>
          <p>{mealType}</p>
          <p>{dishType}</p>
          <a href={m.recipe_url} id="recipe-bttn" className="btn btn-item">Recipe link</a>
          
        </div>
      </div>
      
    )})}
    </div>
  )
}

export default UserMealsList