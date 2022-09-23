class CreateCourseMeals < ActiveRecord::Migration[7.0]
  def change
    create_table :course_meals do |t|
      t.belongs_to :course, index: true, foreign_key: true
      t.belongs_to :meal, index: true, foreign_key: true
      t.timestamps
    end
  end
end
