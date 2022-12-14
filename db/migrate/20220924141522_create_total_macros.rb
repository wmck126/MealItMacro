class CreateTotalMacros < ActiveRecord::Migration[7.0]
  def change
    create_table :total_macros do |t|
      t.float :carbs
      t.float :protein
      t.float :fat
      t.float :serving_calories
      t.belongs_to :meal, null: false, foreign_key: true
      t.timestamps
    end
  end
end
