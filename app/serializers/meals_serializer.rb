class MealsSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :yield, :calories, :meal_type, :dish_type
  has_one :total_macro
end
