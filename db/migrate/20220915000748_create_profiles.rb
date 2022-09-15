class CreateProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :profiles do |t|
      t.string :name
      t.string :image_url
      t.integer :weight
      t.integer :height
      t.integer :carb_goal
      t.integer :protein_goal
      t.integer :fat_goal
      t.float :activity_level
      t.float :bmi
      t.integer :weight_goal
      t.belongs_to :user, foreign_key: true 
      t.timestamps
    end
  end
end
