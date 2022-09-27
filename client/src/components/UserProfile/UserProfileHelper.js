import React, { useEffect } from 'react'

function UserProfileHelper({user}) {

  console.log("user: ", user.name)

  //Put chart of daily macro expenditure and calorie expenditure
    
  return (
    <ul>
      <li> Username: {user.username}</li>
      <li> Height: {user.height} inches</li>
      <li> Weight: {user.weight} lbs</li>
      <li> Goal Calories: {user.goal_cals} KCal</li>
      <li> Protein goal: {user.protein_goal}%, {user.protein_grams}g</li>
      <li> Fat goal: {user.fat_goal}%, {user.fat_grams}g</li>
      <li> Carbs goal: {user.carb_goal}%, {user.carb_grams}g</li>
    </ul>
  )
}

export default UserProfileHelper