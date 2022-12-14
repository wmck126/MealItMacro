class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :weight, :height, :carb_goal, :protein_goal, :fat_goal, :activity_level, :bmi, :weight_goal, :gender, :goal_cals, :carb_grams, :protein_grams, :fat_grams, :height_feet, :height_inch, :age
  has_many :user_meals
  has_many :meals, through: :user_meals
end
