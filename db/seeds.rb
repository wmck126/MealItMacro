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


course1 = Course.create(name: "Lunch")


def food_dataset
  api_data = {key: food_api_key}
  food = RestClient.get("https://api.edamam.com/api/recipes/v2?type=public&q=any&app_id=#{food_api_id}&app_key=#{food_api_key}&random=true")
  food_array = JSON.parse(food)["hits"]
  
  food_array.each do |s|
    Meal.create!(
      name: s["recipe"]["label"],
      image_url: s["recipe"]["image"],
      recipe_url: s["recipe"]["url"],
      yield: s["recipe"]["yield"],
      calories: s["recipe"]["calories"],
      meal_type: s["recipe"]["mealType"],
      dish_type: s["recipe"]["dishType"]
    )
  end
end

food_dataset()





puts 'Done seeding!'
0
