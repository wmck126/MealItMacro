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
  ENV["FOOD_API_KEY"]
end

def food_dataset
  api_data = {key: food_api_key}
  food = RestClient.get("https://api.nal.usda.gov/fdc/v1/foods/search?api_key=#{api_data[:key]}&query=Cheddar%20Cheese")
  food_array = JSON.parse(food)["foods"].first
  
  food_array.each do |s|
    byebug
    Ingredient.create(
      name: s["description"], 
      calories: s["foodNutrients"].detect{|x| x["nutrientId"] = 1008}, 
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
