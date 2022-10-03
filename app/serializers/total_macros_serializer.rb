class TotalMacrosSerializer < ActiveModel::Serializer
  attributes :id, :protein, :carbs, :fat, :serving_calories, 
  has_one :meal
end
