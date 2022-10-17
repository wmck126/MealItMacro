import {useContext, useEffect, useRef} from 'react'
import { UserContext } from '../../components/UserContext'
import { gsap } from 'gsap'
import "./Home.css"

function Home() {

  const user = useContext(UserContext)
  const body = useRef()

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(body.current, {
        x:-200,
        duration: 1.5,
        ease: "circ",
        opacity: 0.3,
      })
      return () => ctx.revert()
    })
  }, [])
  return (
    <div id="homeContainer" ref={body}>
      <h1 id="title">Mealit</h1>
      <h2 id="subTitle">The recipe planner catered to your macro goals</h2>
      <div id="userGreeting">
        <h5>Welcome {user.name} </h5>
        <h5>Your daily calorie goal to {user.weight_goal} weight is: {user.goal_cals} calories per day</h5>
        <h5>According to your macro goals, you need to eat a maximum daily amount of:</h5>
        <ul id="macroList">
          <li>Protein: {user.protein_grams}g</li>
          <li>Carbs: {user.carb_grams}g</li>
          <li>Fat: {user.fat_grams}g</li>
        </ul>
      </div>
    </div>
  )
}

export default Home