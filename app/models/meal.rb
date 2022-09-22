class Meal < ApplicationRecord
  belongs_to :ingredient
  belongs_to :course
  has_many :user_meals
  has_many :users, through: :user_meals
end
