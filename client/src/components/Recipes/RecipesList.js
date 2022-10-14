import React, { useEffect, useState } from 'react'


export default function RecipesList({user, addUserMeals, sort, recipes, setRecipes}) {


  useEffect(() => {
    fetch("/total_macros")
    .then((r) => r.json())
    .then((r) => setRecipes(r))
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


function handleSort() {
  if (sort === "Calories") {
    const sortedData = [...recipes].sort((a, b) => {
      return (a.meal.calories / a.meal.yield) > (b.meal.calories / b.meal.yield) ? 1 : -1
    })
  setRecipes(sortedData)
  } else if (sort === "Sort by:") {
    const sortedData = [...recipes].sort((a, b) => {
      return a.id > b.id ? 1 : -1
    })
  setRecipes(sortedData)
  } else if (sort === "Protein"){
  const sortedData = [...recipes].sort((a, b) => {
    return a.protein > b.protein ? 1 : -1
  })
  setRecipes(sortedData)
  } else if (sort === "Carbs"){
    const sortedData = [...recipes].sort((a, b) => {
      return a.carbs > b.carbs ? 1 : -1
    })
  setRecipes(sortedData)
  } else if (sort === "Fat"){
    const sortedData = [...recipes].sort((a, b) => {
      return a.fat > b.fat ? 1 : -1
    })
  setRecipes(sortedData)
  }
}

useEffect(() => {
  if (sort === "Calories" || "Carbs" || "Protein" || "Fat" || "Sort by:") {
    handleSort()
  } 
}, [sort])
  

function clicked(count) {
  if (count > 0) {
    return "❤️"
  } else {
    return "🤍"
  }
}


  return (
    <>
    {recipes.map((recipe) => {
      let counter = 0
      let servingCalories = Math.round((recipe.meal.calories) / (recipe.meal.yield))
      let dishType = recipe.meal.dish_type.replace(/[\[\]"]+/g, '')
      let mealType = recipe.meal.meal_type.replace(/[\[\]"]+/g, '')
      let protein = Math.round(recipe.protein)
      let carbs = Math.round(recipe.carbs)
      let fat = Math.round(recipe.fat)
      return (
        <div key={recipe.meal.id} className="col-lg-3 col-md-4 col-sm-6">
        <div  className="card" id="card">
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
          <div>
            <a href={recipe.meal.recipe_url} className="btn btn-item" id="recipe-bttn">Recipe link</a>
            <li id="fav-bttn" 
              onClick={(e) => {
                counter+=1
                console.log(counter)
                handleAddToUserList(e, recipe)
              }}><span>{clicked(counter)}</span></li>
            </div>
            </div>
            </div>
        </div>
    )}
    )}
    </>
  )
}
