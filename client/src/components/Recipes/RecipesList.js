import React, { useEffect, useState } from 'react'


export default function RecipesList() {

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetch("/meals")
    .then((r) => r.json())
    .then(setRecipes)
  }, [])

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
            <button className="btn btn-primary">Add to favorites</button>
            
            </div>
            </div>
        </div>
    )}
    )}
    </>
  )
}
