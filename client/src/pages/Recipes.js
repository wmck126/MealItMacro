import React from 'react'
import RecipesList from '../components/Recipes/RecipesList'
import '../components/Recipes/RecipeList.css'

function Recipes() {


  return (
    <>
    <h2>Recipes</h2>
    <div class="row row-cols-1 row-cols-md-6 g-5" id="card-group">
      
    {<RecipesList />}
    </div>
    </>
  )
}

export default Recipes