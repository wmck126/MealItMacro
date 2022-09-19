import {useState} from 'react'
import {Redirect} from 'react-router-dom'

function CreateProfileForm({user, setUser}) {
  const id = user.id
  console.log("this is user id", id)
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
        .then(<Redirect to="/" path="/home"/>)
        .then(console.log('Redirecting..'))
      } else {
        r.json().then((err) => setErrors(err.errors)).then(console.log(errors));
      }
    })
  }


  return (
  <div>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
          <input type="text" onChange={(e) => setName(e.target.value)}/>
        <label>Height: </label>
          <input type="text" onChange={(e) => setHeight(e.target.value)}/>
        <label>Weight: </label>
          <input type="text" onChange={(e) => setWeight(e.target.value)}/>
        
        <label>Carb goals: </label>
          <input type="text" onChange={(e) => setCarbGoal(e.target.value)}/>
        <label>Fat goals: </label>
          <input type="text" onChange={(e) => setFatGoal(e.target.value)}/>
        <label>Protein goals: </label>
          <input type="text" onChange={(e) => setProteinGoal(e.target.value)}/>
        
        <label>Activity Levels: </label>
          <input type="text" onChange={(e) => setActivityLevel(e.target.value)}/>
        <label>What is your weight goal?: </label>
          <input type="text" onChange={(e) => setWeightGoal(e.target.value)}/>

        <button onClick={handleSubmit}>Submit</button>
      </form>
      <p style={{color: 'red'}}>{errors}</p>
  </div>
  )
}

export default CreateProfileForm