class CreateIngredients < ActiveRecord::Migration[7.0]
  def change
    create_table :ingredients do |t|

      t.text :calories
      t.text :protein
      t.text :carbs
      t.text :fat
      t.text :name
      t.timestamps
    end
  end
end
