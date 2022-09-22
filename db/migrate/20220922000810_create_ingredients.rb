class CreateIngredients < ActiveRecord::Migration[7.0]
  def change
    create_table :ingredients do |t|

      t.string :calories
      t.integer :protein
      t.integer :carbs
      t.integer :fat
      t.integer :name
      t.timestamps
    end
  end
end
