class Course < ApplicationRecord
  has_many :course_meals
  has_many :meals, through: :course_meals
end
