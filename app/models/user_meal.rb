class UserMeal < ApplicationRecord
  belongs_to :users
  belongs_to :meals
end
