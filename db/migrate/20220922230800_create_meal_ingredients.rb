class CreateMealIngredients < ActiveRecord::Migration[7.0]
  def change
    create_table :recipe_ingredients do |t|
      t.belongs_to :meal, index: true, foreign_key: true
      t.belongs_to :ingredient, index: true, foreign_key: true
      t.timestamps
    end
  end
end
