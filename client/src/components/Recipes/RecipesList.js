import React, { useEffect, useState } from 'react'


export default function RecipesList({user, addUserMeals}) {

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetch("/meals")
    .then((r) => r.json())
    .then(setRecipes)
  }, [])

  function handleAddToUserList(e, recipe){
    
    e.preventDefault()
    fetch('/user_meals', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        meal_id: recipe.id
      })
  })
  .then(r => r.json())
  .then(userMeals => {
    console.log(userMeals)
    addUserMeals(userMeals)
  })
  .catch(error => console.error(error))
}

  return (
    <>
    {recipes.map((recipe) => {
      let servingCalories = Math.round((recipe.calories) / (recipe.yield))
      return (
        <div class="col-sm-2">
        <div key={recipe.id} className="card" id="card">
          <img src={recipe.image_url} className="card-img-top" alt="recipe image"/>
          <div className="card-body">
          <h5 className="card-title">{recipe.name}</h5>
            <p>{(recipe.meal_type)}</p>
            <p>{recipe.dish_type}</p>
            <p>Calories per serving: {servingCalories}</p>
            <a href={recipe.recipe_url} className="btn btn-primary">Recipe link</a>
            <button className="btn btn-primary" onClick={(e) => handleAddToUserList(e, recipe)}>Add to favorites</button>
            
            </div>
            </div>
        </div>
    )}
    )}
    </>
  )
}
