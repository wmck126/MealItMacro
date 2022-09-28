import React from 'react'
import UserMealsList from '../components/UserMeals/UserMealsList'

function WeeklyMealPlan({user, userMeals}) {
  console.log(userMeals)
  return (
    <div>
    <h2>User favorites</h2>
    {user.meals}
    {<UserMealsList user={user}/>}
    </div>
  )
}

export default WeeklyMealPlan