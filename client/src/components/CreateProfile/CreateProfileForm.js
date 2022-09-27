import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Slider from '@mui/material/Slider'
import './CreateProfileForm.css'

function CreateProfileForm({user, setUser}) {
  const navigate = useNavigate()
  const id = user.id
  const [name, setName] = useState("")
  // const [imageUrl, setImageUrl] = useState("")
  const [weight, setWeight] = useState(0)
  const [feet, setFeet] = useState(0)
  const [inches, setInches] = useState(0)
  const [carbGoal, setCarbGoal] = useState(0)
  const [proteinGoal, setProteinGoal] = useState(0)
  const [fatGoal, setFatGoal] = useState(0)
  const [activityLevel, setActivityLevel] = useState(0)  
  const [bmi, setBmi] = useState(0)
  const [weightGoal, setWeightGoal] = useState("")
  const [errors, setErrors] = useState("")
  const [gender, setGender] = useState("")
  const [age, setAge] = useState(0)
  
  const [macroCals, setMacroCals] = useState(0)
  const [macroGrams, setMacroGrams] = useState(0)
  let activeBMR = null
  let calcBMR = null
  let goalCals = null
  
console.log("Gender: ", gender)


  //Need to fix height to inches, giving way too big a number
  function handleSubmit(e){
    e.preventDefault()
    console.log("feet: ", feet)
    console.log("inches: ", inches)
    const feetInch = parseInt(feet * 12)
    const inch = parseInt(inches)
    const heightInches = feetInch + inch
    const inputBMI = Math.round( (weight / (heightInches * heightInches)) * 703)
    console.log("This is height", heightInches)
    console.log("this is BMI", inputBMI)
    //Calc basic BMR
    console.log("This is gender: ", gender)
    if (gender === 'Male'){
      calcBMR = (66 + (6.23 * weight) + (12.7 * heightInches) - (6.8 * age))
    } else {
      calcBMR = (655 + (4.35 * weight) + (4.7 * heightInches) - (4.7 * age))
    }
    console.log("This is calcBMR: ", calcBMR) //GOOD
    debugger
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
    console.log("This is activeBMR: ", activeBMR) //GOOD
    debugger
    //Goal Calories
    if(weightGoal === "gain"){
      goalCals = (activeBMR + 500)
    } else if (weightGoal === 'maintain'){
      goalCals = activeBMR
    } else if (weightGoal === 'lose'){
      goalCals = (activeBMR - 500)
    }
    console.log("This is goalCals: ", goalCals) // GOOD
    debugger

    //Calc macro calories
    ////get percentages of macros
    const carb = parseInt(carbGoal)
    const fat = parseInt(fatGoal)
    const protein = parseInt(proteinGoal)
    if ((carb + protein + fat) != 100 ){
      debugger
      return setErrors("All macros must add up to 100!").then(console.log(errors))
    }
    const macroCarbs = (carbGoal/100)
    const macroProtein = (proteinGoal/100)
    const macroFat = (fatGoal/100)
    const carbCals = (goalCals * macroCarbs)
    const proteinCals = (goalCals * macroProtein)
    const fatCals = (goalCals * macroFat)

    //Calc macro allowances in grams per day
    const carbGrams = Math.round(carbCals / 4)
    const proteinGrams = Math.round(proteinCals / 4)
    const fatGrams = Math.round(fatCals / 9)
    debugger

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
        fat_grams: fatGrams
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
    .then(console.log('Redirecting..'))
  }

  //Calculate the sum of macros, ensure they add up to 100
  
  
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
        <div className='form-outline mb-4'>
          <label className='form-label'>Name: </label>
            <input type="text" className='form-control' onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className='form-outline mb-4'>
          <label className='form-label'>Gender</label>
          <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={(e) => setGender(e.target.value)}>
            <option selected>Select:</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className='form-outline mb-4'>
          <label className='form-label'>Age: </label>
            <input type="text" className='form-control' onChange={(e) => setAge(e.target.value)}/>
        </div>
        <div className='form-row'>
          <div className='col-7'>
          <label className='form-label'>Height: </label><br/>
          <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={(e) => setFeet(e.target.value)}>
            <option selected>Feet</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
          <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={(e) => setInches(e.target.value)}>
            <option selected>Inches</option>
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
        <div className='form-outline mb-4'>
          <label className='form-label'>Weight: </label>
            <input className='form-control' type="text" onChange={(e) => setWeight(e.target.value)}/>
        </div>
        <div className='form-outline mb-4'>
          <label className='form-label'>Carb goals: </label>
            <input className='form-control' type="text" onChange={(e) => setCarbGoal(e.target.value)}/>
        </div>
        <div className='form-outline mb-4'>
          <label className='form-label'>Fat goals: </label>
            <input className='form-control' type="text" onChange={(e) => setFatGoal(e.target.value)}/>
        </div>
        <div className='form-outline mb-4'>
          <label className='form-label'>Protein goals: </label>
            <input className='form-control' type="text" onChange={(e) => setProteinGoal(e.target.value)}/>
          </div>
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
                onChange={(e) => setActivityLevel(e.target.value)}
              />
          </div>
          <div className='form-outline mb-4'>
            <label className='form-label'>Are you trying to gain, maintain, or lose weight? </label>
            <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={(e) => setWeightGoal(e.target.value)}>
              <option value="gain">Gain</option>
              <option value="maintain">Maintain</option>
              <option value="lose">Lose</option>
            </select>
          </div>
        <button className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Submit</button>
      </form>

      <p style={{color: 'red'}}>{errors}</p>
  </div>
  )
}

export default CreateProfileForm