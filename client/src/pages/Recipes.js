import React from 'react'
import RecipesList from '../components/Recipes/RecipesList'
import '../components/Recipes/RecipeList.css'
import CreateRecipeForm from '../components/CreateRecipe/CreateRecipeForm'


function Recipes({user, addUserMeals}) {
  
  return (
    <>
    <h2>Recipes</h2>
    {<CreateRecipeForm />}
    <div class="row row-cols-1 row-cols-md-6 g-5" id="card-group">
    {<RecipesList user={user} addUserMeals={addUserMeals}/>}
    </div>
    </>
  )
}

export default Recipes