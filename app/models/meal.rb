class Meal < ApplicationRecord
  has_one :total_macro
  
  has_many :user_meals
  has_many :users, through: :user_meals
end
