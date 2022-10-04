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

course1 = Course.create(name: "Breakfast")
course1 = Course.create(name: "Lunch")
course1 = Course.create(name: "Dinner")
course1 = Course.create(name: "Snack")
@x = 0

##create unique meal_id, for every time a meal is created increment id by 1

def create_meals array 
  array.each do |s|
    @x += 1
    serving_yield = s["recipe"]["yield"]
    Meal.create!(
      id: @x,
      name: s["recipe"]["label"],
      image_url: s["recipe"]["image"],
      recipe_url: s["recipe"]["url"],
      yield: serving_yield,
      calories: s["recipe"]["calories"],
      meal_type: s["recipe"]["mealType"],
      dish_type: s["recipe"]["dishType"]
    )
    TotalMacro.create!(
      carbs: (s["recipe"]["totalNutrients"]["CHOCDF"]["quantity"])/(serving_yield),
      protein: (s["recipe"]["totalNutrients"]["PROCNT"]["quantity"])/(serving_yield),
      fat: (s["recipe"]["totalNutrients"]["FAT"]["quantity"])/(serving_yield),
      serving_calories: (s["recipe"]["calories"])/(serving_yield),
      meal_id: @x
    )
  end
end



def food_dataset
  api_data = {key: food_api_key}
  breakfast = RestClient.get("https://api.edamam.com/api/recipes/v2?type=public&q=random&app_id=#{food_api_id}&app_key=#{food_api_key}&mealType=Breakfast&dishType=Main%20course")
  lunch = RestClient.get("https://api.edamam.com/api/recipes/v2?type=public&q=random&app_id=#{food_api_id}&app_key=#{food_api_key}&mealType=Lunch&dishType=Main%20course")
  dinner = RestClient.get("https://api.edamam.com/api/recipes/v2?type=public&q=any&app_id=#{food_api_id}&app_key=#{food_api_key}&mealType=Dinner&dishType=Main%20course")
  dessert = RestClient.get("https://api.edamam.com/api/recipes/v2?type=public&q=random&app_id=#{food_api_id}&app_key=#{food_api_key}&dishType=Desserts")
  @breakfast_array = JSON.parse(breakfast)["hits"]
  @dinner_array = JSON.parse(dinner)["hits"]
  @lunch_array = JSON.parse(lunch)["hits"]
  @dessert_array = JSON.parse(dessert)["hits"]
  create_meals(@breakfast_array)
  sleep 1.5
  create_meals(@dinner_array)
  sleep 1.5
  create_meals(@lunch_array)
  sleep 1.5
  create_meals(@dessert_array)
end

food_dataset()




puts 'Done seeding!'
0
