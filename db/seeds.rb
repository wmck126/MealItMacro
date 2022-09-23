# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'rest-client'
require 'byebug'
puts 'Seeding...'

def food_api_key
  ENV["APP_KEY"]
end

def food_api_id
  ENV["APP_ID"]
end

def food_dataset
  api_data = {key: food_api_key}
  food = RestClient.get("https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=#{food_api_id}&app_key=#{food_api_key}&diet=low-carb")
  food_array = JSON.parse(food)["hits"]
  food_array.each do |s|
    s["recipe"]["ingredients"].each do |s|
    Ingredient.create(
      name: s["text"], 
      calories: s["calories"], 
      protein: s["foodNutrients"].detect{|x| x["nutrientId"] = 1257}, 
      carbs: s["foodNutrients"].detect{|x| x["nutrientId"] = 1005}, 
      fat: s["foodNutrients"].detect{|x| x["nutrientId"] = 1004}
      )
  end
end

food_dataset()


course1 = Course.create(name: "Lunch")

ingredient1 = Ingredient.create(calories: "700", protein: 20, carbs: 15, fat: 10, name: "bread")
ingredient2 = Ingredient.create(calories: "300", protein: 30, carbs: 12, fat: 11, name: "peanut butter")
Meal.create(name: "sandwich", ingredient_id: 1, course_id: 1)

puts 'Done seeding!'
0
