import React from 'react'
import UserMealsList from '../components/UserMeals/UserMealsList'

function WeeklyMealPlan({user}) {
  return (
    <div>
    <h2>User favorites</h2>
    {<UserMealsList user={user}/>}
    </div>
  )
}

export default WeeklyMealPlan