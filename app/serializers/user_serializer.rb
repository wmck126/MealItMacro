class UserSerializer < ActiveModel::Serializer
  attributes :id, 
  :username, 
  :created_at, 
  :name,
  :image_url,
  :weight,
  :height,
  :carb_goal,
  :protein_goal,
  :fat_goal,
  :activity_level,
  :bmi,
  :weight_goal 
end
