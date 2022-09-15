import {useContext} from 'react'
import { UserContext } from '../components/UserContext'

function Home() {

  const user = useContext(UserContext)

  

  return (
    <div>Hello, {user}</div>
  )
}

export default Home