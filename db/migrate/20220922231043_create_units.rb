class CreateUnits < ActiveRecord::Migration[7.0]
  def change
    create_table :units do |t|
      t.integer :cup
      t.integer :tbsp 
      t.integer :tsp 
      t.integer :pint
      t.integer :quart
      t.integer :gallon
      t.integer :pound
      t.integer :grams
      t.integer :ounces
      t.integer :item
      t.timestamps
    end
  end
end
