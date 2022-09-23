class CourseMeal < ApplicationRecord
  belongs_to :course
  belongs_to :meal
end
