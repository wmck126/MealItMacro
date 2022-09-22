class CreateMeals < ActiveRecord::Migration[7.0]
  def change
    create_table :meals do |t|

      t.string :name
      t.belongs_to :ingredient, index: true, foreign_key: true
      t.belongs_to :course, index: true, foreign_key: true
      t.timestamps
    end
  end
end
