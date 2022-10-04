import React, {useState} from 'react'
import { Form } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import {Button} from 'react-bootstrap'

function CreateRecipeForm() {
  const [name, setName] = useState("")
  const [recipeUrl, setRecipeUrl] = useState("")
  const [yields, setYields] = useState("")
  const [calories, setCalories] = useState("")
  const [mealType, setMealType] = useState("")
  const [dishType, setDishType] = useState("")
  const [carbs, setCarbs] = useState(0)
  const [protein, setProtein] = useState(0)
  const [fat, setFat] = useState(0)
  const [servingCals, setServingCals] = useState(0)
  const [errors, setErrors] = useState("")
  const [show, setShow] = useState(false)
  console.log(name)


  function handleSubmit(e) {
    // fetch ("/meals", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name,
    //     recipe_url: recipeUrl,
    //     yield: yields,
    //     meal_type: mealType,
    //     dish_type: dishType
    //   })
    // })

    fetch("/total_macros", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carbs,
        protein,
        fat,
        serving_calories: servingCals,
        name,
        recipe_url: recipeUrl,
        yield: yields,
        meal_type: mealType,
        dish_type: dishType
    })
  })
  
    .then((r) => {
      if (r.ok){
        r.json()
        .then(() => alert("Meal added!"))
        
      } else {
        r.json().then((err) => setErrors(err.errors))
      }
    })
  }


  const handleClose = () => setShow(false)
  const handleOpen = () => setShow(true)  

  return (
    <>
      <Button variant="light" onClick={handleOpen}>Add a recipe +</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlID="createRecipeForm">
              <Form.Label>Recipe Title</Form.Label>
              <Form.Control type="text" autofocus onChange={(e) => setName(e.target.value)}/>
              <Form.Label>Recipe URL</Form.Label>
              <Form.Control type="text" onChange={(e) => setRecipeUrl(e.target.value)}/>
              <Form.Label>How many servings?</Form.Label>
              <Form.Control type="text" onChange={(e) => setYields(e.target.value)} />
              <Form.Label>Meal Type</Form.Label>
              <Form.Select onChange={(e) => setMealType(e.target.value)}>
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Snack</option>
              </Form.Select>
              <Form.Label>Dish Type (Main Course, Appetizer, etc)</Form.Label>
              <Form.Select onChange={(e) => setDishType(e.target.value)}>
                <option>Main course</option>
                <option>Appetizer</option>
                <option>Dessert</option>
                <option>Snack</option>
                <option>Drink</option>
                <option>Salad</option>
              </Form.Select>
              <Form.Label>Calories per serving</Form.Label>
              <Form.Control type="text" onChange={(e) => setServingCals(e.target.value)}/>
              <Form.Label>Carbs (g)</Form.Label>
              <Form.Control type="text" onChange={(e) => setCarbs(e.target.value)}/>
              <Form.Label>Protein (g)</Form.Label>
              <Form.Control type="text" onChange={(e) => setProtein(e.target.value)}/>
              <Form.Label>Fat (g)</Form.Label>
              <Form.Control type="text" onChange={(e) => setFat(e.target.value)}/>

            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
    
  )

}

export default CreateRecipeForm