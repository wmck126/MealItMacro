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
