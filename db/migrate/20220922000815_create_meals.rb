class CreateMeals < ActiveRecord::Migration[7.0]
  def change
    create_table :meals do |t|

      t.string :name
      t.string :image_url
      t.string :recipe_url
      t.int :yield
      t.float :calories
      
      t.timestamps
    end
  end
end
