# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'rest-client'

def food_api_key
  ENV["FOOD_API_KEY"]
end

def food_dataset
  api_data = {key: food_api_key}
  food = RestClient.get()
end



course1 = Course.create(name: "Lunch")

ingredient1 = Ingredient.create(calories: "700", protein: 20, carbs: 15, fat: 10, name: "bread")
ingredient2 = Ingredient.create(calories: "300", protein: 30, carbs: 12, fat: 11, name: "peanut butter")
Meal.create(name: "sandwich", ingredient_id: 1, course_id: 1)