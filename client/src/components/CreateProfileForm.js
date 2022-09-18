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
  const [userID, setUserID] = useState(0)

  //if count = #, show this portion of the profile creation page

  const basicInfo = () => {
    return (
      <form>
        <label>Name: </label>
        <input type="text" />
      </form>
    )
  }
  return (
    
  )
}

export default CreateProfileForm