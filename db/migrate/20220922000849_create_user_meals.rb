class CreateUserMeals < ActiveRecord::Migration[7.0]
  def change
    create_table :user_meals do |t|
      t.belongs_to :users, index: true, foreign_key: true
      t.belongs_to :meals, index: true, foreign_key: true
      t.timestamps
    end
  end
end
