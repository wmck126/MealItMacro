import React, { useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import {Pie} from 'react-chartjs-2'
import './UserProfile.css'

function UserProfileHelper({user}) {
  ChartJS.register(ArcElement, Tooltip, Legend)
  //Put chart of daily macro expenditure and calorie expenditure
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
    
  return (
    <div>
    <ul className="profList">
      <li> Username: {user.username}</li>
      <li> Height: {user.height} inches</li>

      <li> Weight: <input value={user.weight}></input> lbs</li>
      <li> BMI: {user.bmi} </li>
      <li> Goal Calories: {user.goal_cals} KCal</li>
      <li> Protein goal: <input value={user.protein_goal} id="macroInput"></input>%, {user.protein_grams}g</li>
      <li> Fat goal: <input value={user.fat_goal} id="macroInput"></input>%, {user.fat_grams}g</li>
      <li> Carbs goal: <input value={user.carb_goal} id="macroInput"></input>%, {user.carb_grams}g</li>
    </ul>
      <div className="macroChart">
        <Pie data={data}/>
      </div>
    </div>
  )
}

export default UserProfileHelper