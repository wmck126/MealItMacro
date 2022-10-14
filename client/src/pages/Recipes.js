import React, {useState} from 'react'
import RecipesList from '../components/Recipes/RecipesList'
import '../components/Recipes/RecipeList.css'
import CreateRecipeForm from '../components/CreateRecipe/CreateRecipeForm'
import { Form } from 'react-bootstrap'


function Recipes({user, addUserMeals, recipes, setRecipes}) {
  const [options, setOptions] = useState("")
  

  return (
    <>
    <h2>Recipes</h2>
    <div id="sortAddBttn">
    {<CreateRecipeForm />}
      <Form.Select onChange={(e) => setOptions(e.target.value)} id="sortBy">
        <option defaultValue>Sort by:</option>
        <option>Calories</option>
        <option>Protein</option>
        <option>Carbs</option>
        <option>Fat</option>
        </Form.Select>
      
    </div>
    <div className="row row-cols-1 row-cols-md-6 g-5" id="card-group">
    {<RecipesList user={user} addUserMeals={addUserMeals} sort={options} recipes={recipes} setRecipes={setRecipes}/>}
    </div>
    </>
  )
}

export default Recipes