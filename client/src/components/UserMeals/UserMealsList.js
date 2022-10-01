import React, { useEffect, useState } from 'react'

function UserMealsList({user}) {
  //use_effect usecontext to retrieve a list of current users meals
  //map through those meals and use same method as m lister to show current user meals
  const [newUser, setNewUser] = useState([])
  useEffect(() => {
    fetch(`/users/${user.id}`)
    .then(r => r.json())
    .then(user => setNewUser(user))
    .catch(error => console.error(error))
  }, [])
  console.log(newUser)
  
  
  return (
    <div>
    { newUser.meals === undefined ? null 
    : newUser.meals.map((m) => (
      <div className="col-sm-2">
      <div key={m.id} className="card" id="card">
        <img src={m.image_url} className="card-img-top" alt="m image"/>
        <div className="card-body">
        <h5 className="card-title">{m.name}</h5>
          <p>{(m.meal_type)}</p>
          <p>{m.dish_type}</p>
          <a href={m.m_url} className="btn btn-primary">m link</a>
          <button className="btn btn-primary" onClick={(e) => e}>Remove from favorites</button>
        </div>
      </div>
      </div>
    ))}
    </div>
  )
}

export default UserMealsList