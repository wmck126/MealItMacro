import {useContext} from 'react'
import { UserContext } from '../components/UserContext'

function Home() {

  const user = useContext(UserContext)

  return (
    <div>
    <p>Hello, {user.name}</p>
    <h1>Mealit, the recipe planner catered to your macro goals</h1>
    <h3>Create an account and start having recipes catered to you for whether you want to lose weight, gain muscle, or just would like relief from planning meals.</h3>
    </div>
  )
}

export default Home