class Meal < ApplicationRecord
  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients

  #belongs_to :course
  has_one :total_macro
  
  has_many :user_meals
  has_many :users, through: :user_meals
end
