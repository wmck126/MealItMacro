import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Slider from '@mui/material/Slider'
import './CreateProfileForm.css'

function CreateProfileForm({user, setUser}) {
  const navigate = useNavigate()
  const id = user.id
  const [name, setName] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [carbGoal, setCarbGoal] = useState(0)
  const [proteinGoal, setProteinGoal] = useState(0)
  const [fatGoal, setFatGoal] = useState(0)
  const [activityLevel, setActivityLevel] = useState(0)  
  const [bmi, setBmi] = useState(0)
  const [weightGoal, setWeightGoal] = useState(0)
  const [errors, setErrors] = useState("")
  //const [macroSum, setMacroSum] = useState([])
  let macroSum = []
  console.log(macroSum)

  function handleSubmit(e){
    e.preventDefault()
    const inputBMI = ( (weight / (height * height)) * 703)
    console.log("this is BMI", inputBMI)
    fetch(`/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        weight,
        height,
        carb_goal: carbGoal, 
        protein_goal: proteinGoal, 
        fat_goal: fatGoal,
        activity_level: activityLevel,
        weight_goal: weightGoal,
        bmi: inputBMI,
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
  useEffect(() => {
    macroSum.push(carbGoal + fatGoal + proteinGoal)
  }, [carbGoal, proteinGoal, fatGoal])
  
  const marks = [
    {
      value: 0,
      label: "Desk job/not active"
    },
    {
      value: 25,
      label: "Moving around, somewhat active"
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
          <label className='form-label'>Height: </label>
            <input className='form-control' type="text" onChange={(e) => setHeight(e.target.value)}/>
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
                step={5}
                marks={marks}
                min={0}
                max={100}
                onChange={(e) => setActivityLevel(e.target.value)}
              />
          </div>
          <div className='form-outline mb-4'>
            <label className='form-label'>What is your goal weight?: </label>
              <input className='form-control' type="text" onChange={(e) => setWeightGoal(e.target.value)}/>
          </div>
        <button className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Submit</button>
      </form>

      <p style={{color: 'red'}}>{errors}</p>
  </div>
  )
}

export default CreateProfileForm