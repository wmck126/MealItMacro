class CreateMeals < ActiveRecord::Migration[7.0]
  def change
    create_table :meals do |t|

      t.string :name
      t.string :image_url
      t.string :recipe_url
      t.integer :yield
      t.float :calories
      t.string :meal_type
      t.string :dish_type
      #t.belongs_to :course, null: false, foreign_key: true
      t.timestamps
    end
  end
end
