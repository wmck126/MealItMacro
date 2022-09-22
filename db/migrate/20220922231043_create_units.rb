class CreateUnits < ActiveRecord::Migration[7.0]
  def change
    create_table :units do |t|
      t.int :cup
      t.int :tbsp 
      t.int :tsp 
      t.int :pint
      t.int :quart
      t.int :gallon
      t.int :pound
      t.int :grams
      t.int :ounces
      t.timestamps
    end
  end
end
