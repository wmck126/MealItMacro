import React, { useEffect, useState } from 'react'


export default function RecipesList({user, addUserMeals}) {

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetch("/total_macros")
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
    addUserMeals(userMeals)
  })
}


  return (
    <>
    {recipes.map((recipe) => {
      let servingCalories = Math.round((recipe.meal.calories) / (recipe.meal.yield))
      let dishType = recipe.meal.dish_type.replace(/[\[\]"]+/g, '')
      let mealType = recipe.meal.meal_type.replace(/[\[\]"]+/g, '')
      let protein = Math.round(recipe.protein)
      let carbs = Math.round(recipe.carbs)
      let fat = Math.round(recipe.fat)
      return (
        <div className="col-lg-3 col-md-4 col-sm-6">
        <div key={recipe.meal.id} className="card" id="card">
          <img src={recipe.meal.image_url} className="card-img-top" alt="recipe image"/>
          <div className="card-body">
          <h5 className="card-title">{recipe.meal.name}</h5>
            <p>{mealType}</p>
            <p>{dishType}</p>
          <ul>
            <li>Calories per serving: {servingCalories}</li>
            <li>Protein: {protein}g</li>
            <li>Carbs: {carbs}g</li>
            <li>Fat: {fat}</li>
          </ul>
          <div id="buttons">
            <a href={recipe.meal.recipe_url} className="btn btn-primary" id="recipe-bttn">Recipe link</a>
            <button id="fav-bttn" onClick={(e) => (handleAddToUserList(e, recipe))}> Add to favorites </button>
            </div>
            </div>
            </div>
        </div>
    )}
    )}
    </>
  )
}
