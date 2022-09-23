class MealIngredient < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient
  has_one :unit
end
