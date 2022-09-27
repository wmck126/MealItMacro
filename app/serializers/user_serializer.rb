class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :weight, :height, :carb_goal, :protein_goal, :fat_goal, :activity_level, :bmi, :weight_goal, :gender, :goal_cals, :carb_grams, :protein_grams, :fat_grams
  has_many :user_meals
end
