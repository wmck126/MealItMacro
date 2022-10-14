import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Slider from '@mui/material/Slider'
import './CreateProfileForm.css'

function CreateProfileForm({user, setUser}) {
  const navigate = useNavigate()
  
  const id = user.id
  const [name, setName] = useState(user.name)
  // const [imageUrl, setImageUrl] = useState("")
  const [weight, setWeight] = useState(user.weight)
  const [feet, setFeet] = useState(user.height_feet)
  const [inches, setInches] = useState(user.height_inch)
  const [carbGoal, setCarbGoal] = useState(user.carb_goal)
  const [proteinGoal, setProteinGoal] = useState(user.protein_goal)
  const [fatGoal, setFatGoal] = useState(user.fat_goal)
  const [activityLevel, setActivityLevel] = useState(user.activity_level)  
  const [weightGoal, setWeightGoal] = useState(user.weight_goal)
  const [errors, setErrors] = useState("")
  const [gender, setGender] = useState(user.gender)
  const [age, setAge] = useState(user.age)
  let activeBMR = null
  let calcBMR = null
  let goalCals = null
  console.log(carbGoal)

  //Need to fix height to inches, giving way too big a number
  function handleSubmit(e){
    e.preventDefault()
    const feetInch = parseInt(feet * 12)
    const inch = parseInt(inches)
    const heightInches = feetInch + inch
    const inputBMI = Math.round( (weight / (heightInches * heightInches)) * 703)
    //Calc basic BMR
    if (gender === 'Male'){
      calcBMR = (66 + (6.23 * weight) + (12.7 * heightInches) - (6.8 * age))
    } else {
      calcBMR = (655 + (4.35 * weight) + (4.7 * heightInches) - (4.7 * age))
    }
    //Calc active BMR 
    if (activityLevel === 0){
      activeBMR = (calcBMR * 1.2)
    } else if (activityLevel === 25){
      activeBMR = (calcBMR * 1.375)
    } else if (activityLevel === 50){
      activeBMR = (calcBMR * 1.55)
    } else if (activityLevel === 75){
      activeBMR = (calcBMR * 1.725)
    } else if (activityLevel === 100){
      activeBMR = (calcBMR * 1.9)
    }
    //Goal Calories
    if(weightGoal === "gain"){
      goalCals = (activeBMR + 500)
    } else if (weightGoal === 'maintain'){
      goalCals = activeBMR
    } else if (weightGoal === 'lose'){
      goalCals = (activeBMR - 500)
    }
    //Calc macro calories
    ////get percentages of macros
    const carb = parseInt(carbGoal)
    const fat = parseInt(fatGoal)
    const protein = parseInt(proteinGoal)
    if ((carb + protein + fat) != 100 ){
      return setErrors("All macros must add up to 100!")
    }
    const macroCarbs = (carbGoal/100)
    const macroProtein = (proteinGoal/100)
    const macroFat = (fatGoal/100)
    const carbCals = (goalCals * macroCarbs)
    const proteinCals = (goalCals * macroProtein)
    const fatCals = (goalCals * macroFat)
    const carbGrams = Math.round(carbCals / 4)
    const proteinGrams = Math.round(proteinCals / 4)
    const fatGrams = Math.round(fatCals / 9)
    
    fetch(`/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        weight,
        height: heightInches,
        carb_goal: carbGoal, 
        protein_goal: proteinGoal, 
        fat_goal: fatGoal,
        activity_level: activityLevel,
        weight_goal: weightGoal,
        bmi: inputBMI,
        gender,
        goal_cals: goalCals,
        carb_grams: carbGrams,
        protein_grams: proteinGrams,
        fat_grams: fatGrams,
        height_inch: inches,
        height_feet: feet,
        age: age
      }),
    }).then((r) => {
      if (r.ok) {
        r.json()
        .then((user) => {
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))
        })
        
      } else {
        r.json().then((err) => setErrors(err.errors)).then(console.log(errors));
      }
    })
    .then(() => navigate("/"))
  }

  
  const marks = [
    {
      value: 0,
      label: "Little to no activity"
    },
    {
      value: 25,
      label: "Light exercise"
    },
    {
      value: 50,
      label: "Workout 2-3x a week"
    },
    {
      value: 75,
      label: "Workout most days"
    },
    {
      value: 100,
      label: "Workout everyday!"
    }
  ]

  

  return (
  <div id="profileForm" className='container'>
      <form onSubmit={handleSubmit}>
        <div id="basicInfoContainer">
        <div className='form-outline mb-4' id="name">
          <label className='form-label'>Name: </label>
            <input type="text" className='form-control' value={name} onChange={(e) => setName(e.target.value)} required/>
        </div>
        <div id="gender">
        <div className='form-outline mb-4' >
          <label className='form-label'>Gender</label>
          <select className="custom-select mr-sm-2" id="genderBttn" value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option defaultValue>Select:</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        </div>
        <div className='form-outline mb-4' id="age">
          <label className='form-label'>Age: </label>
            <input type="text" className='form-control' value={age} onChange={(e) => setAge(e.target.value)} required/>
        </div>
        <div className='form-row'>
          <div className='col-7' id="height">
          <label className='form-label'>Height: </label><br/>
          <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" value={feet} onChange={(e) => setFeet(e.target.value)} required>
            <option defaultValue>Feet</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
          <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" value={inches} onChange={(e) => setInches(e.target.value)} required>
            <option defaultValue>Inches</option>
            <option value="1">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
          </select>
          </div><br/>
        </div>
        </div>
        <div id="macroGoals">
        <div className='form-outline mb-4' id="weight">
          <label className='form-label'>Weight: </label>
            <input className='form-control' type="text" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="lbs" required/>
        </div>
        
          
            <label className='form-label'>Carb goals: </label>
            <div className='input-group mb-3' id="carb">
              <input className='form-control' type="text" value={carbGoal} onChange={(e) => setCarbGoal(e.target.value)} placeholder="%" required/>
              <span className="input-group-text">%</span>
          </div>
            <label className='form-label'>Fat goals: </label>
            <div className='input-group mb-3' id="fat">
              <input className='form-control' type="text" value={fatGoal} onChange={(e) => setFatGoal(e.target.value)} placeholder="%" required/>
              <span className="input-group-text">%</span>
          </div>
            <label className='form-label'>Protein goals: </label>
            <div className='input-group mb-3' id="protein">
              <input className='form-control' type="text" value={proteinGoal} onChange={(e) => setProteinGoal(e.target.value)}placeholder="%" required/>
              <span className="input-group-text">%</span>
            </div>
        </div>
        <div id="activityLevelContainer">
          <div className='form-outline mb-4'>
            <label className='form-label'>Activity Levels: </label>
              <Slider
                aria-label="Activity"
                defaultValue={50}
                valueLabelDisplay="auto"
                step={25}
                marks={marks}
                min={0}
                max={100}
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
              />
          </div>
        </div>
          <div className='form-outline mb-4'id="weightGoal">
            <label className='form-label'>Are you trying to gain, maintain, or lose weight? </label>
            <select className="custom-select mr-sm-2" value={weightGoal} onChange={(e) => setWeightGoal(e.target.value)} id="weightGoalBttn" required>
              <option value="gain">Gain</option>
              <option value="maintain">Maintain</option>
              <option value="lose">Lose</option>
            </select>
          </div>
        <button id="submitBttn" className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Submit</button>
      </form>

      <p style={{color: 'red'}}>{errors}</p>
  </div>
  )
}

export default CreateProfileForm