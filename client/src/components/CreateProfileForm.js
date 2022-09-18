import {useState} from 'react'

function CreateProfileForm() {
  const [count, setCount] = useState(0)
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

  function handleSubmit(e){
  if (count === 3) {
    e.preventDefault()
    fetch("/signup", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        count,
        name,
        weight,
        height,
        carbGoal, 
        proteinGoal, 
        fatGoal,
        activityLevel,
        weightGoal,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user)
          localStorage.setItem("user", JSON.stringify(user))
        })
        .then(setClick(false))
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    })
  }
}

  return (
  <div>
    {count === 0 && (
      <form >
          <label>Name: </label>
            <input type="text" onChange={(e) => setName(e.target.value)}/>
          <label>Height: </label>
            <input type="text" onChange={(e) => setHeight(e.target.value)}/>
          <label>Weight: </label>
            <input type="text" onChange={(e) => setWeight(e.target.value)}/>
          <button onClick={() => setCount(1)}>Submit</button>
        </form>
    )}
    {count === 1 && (
      <form >
      <label>Carb goals: </label>
        <input type="text" onChange={(e) => setCarbGoal(e.target.value)}/>
      <label>Fat goals: </label>
        <input type="text" onChange={(e) => setFatGoal(e.target.value)}/>
      <label>Protein goals: </label>
        <input type="text" onChange={(e) => setProteinGoal(e.target.value)}/>
      <button onClick={() => setCount(2)}>Submit</button>
    </form>
    )}
    {count === 2 && (
      <form >
        <label>Activity Levels: </label>
          <input type="text" onChange={(e) => setActivityLevel(e.target.value)}/>
        <label>What is your weight goal?: </label>
          <input type="text" onChange={(e) => setWeightGoal(e.target.value)}/>
        <label>Protein goals: </label>
          <input type="text" onChange={(e) => setHeight(e.target.value)}/>
        <button onClick={() => setCount(3)}>Submit</button>
      </form>
    )}
  </div>
  )
}

export default CreateProfileForm