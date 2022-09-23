class Meal < ApplicationRecord
  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients

  belongs_to :course_meal
  
  has_many :user_meals
  has_many :users, through: :user_meals
end
