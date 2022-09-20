import {useContext} from 'react'
import { UserContext } from '../components/UserContext'

function Home() {

  const user = useContext(UserContext)

  

  return (
    <div>
    <p>Hello, {user.name}</p>
    </div>
  )
}

export default Home