import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import {Pie} from 'react-chartjs-2'
import {useNavigate } from 'react-router-dom'
import './UserProfile.css'

function UserProfileHelper({user}) {
  const navigate = useNavigate()
  ChartJS.register(ArcElement, Tooltip, Legend)
  const data = {
    labels: ['Protein', 'Fat', 'Carbs'],
    datasets: [
      {
        label: 'Macros (g)',
        data: [user.protein_goal, user.fat_goal, user.carb_goal],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1,
      },
    ],
  }

  function handleDeleteAccount(id) {
    fetch(`/users/${id}`, {method: 'DELETE'})
    .then(localStorage.clear())
    .then(navigate('/login'))
    .then(window.location.reload())
  }

  function handleEditAccount(){
    navigate("/createProfile")
  }
  
    
  return (
    <div>
    <ul id="profList">
      <li> Username: {user.username}</li>
      <li> Height: {user.height} inches</li>
      <li> Weight: <input value={user.weight} id="weightInput"/> lbs</li>
      <li> BMI: {user.bmi} </li>
      <li> Goal Calories: {user.goal_cals} KCal</li>
      <li> Protein goal: <input value={user.protein_goal} id="macroInput"/>%, {user.protein_grams}g</li>
      <li> Fat goal: <input value={user.fat_goal} id="macroInput"/>%, {user.fat_grams}g</li>
      <li> Carbs goal: <input value={user.carb_goal} id="macroInput"/>%, {user.carb_grams}g</li>
      <div id="buttons">
        <button className="btn btn-primary" id="editAccount" onClick={() => handleEditAccount(user.id)}>Edit Account</button>
        <button className="btn btn-danger" id="deleteAccount" onClick={() => handleDeleteAccount(user.id)}>Delete account</button>
      </div>
    </ul>
      <div className="macroChart">
        <Pie data={data}/>
      </div>
    </div>
  )
}

export default UserProfileHelper