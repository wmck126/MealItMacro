class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :name
      t.string :image_url
      t.integer :weight
      t.integer :height
      t.integer :carb_goal
      t.integer :protein_goal
      t.integer :fat_goal
      t.float :activity_level
      t.float :bmi
      t.string :weight_goal #lose, gain, maintain
      t.string :gender
      t.integer :goal_cals
      t.integer :carb_grams
      t.integer :protein_grams
      t.integer :fat_grams
      t.timestamps
    end
  end
end
