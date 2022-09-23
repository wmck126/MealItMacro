# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_09_23_141541) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "course_meals", force: :cascade do |t|
    t.bigint "course_id"
    t.bigint "meal_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_course_meals_on_course_id"
    t.index ["meal_id"], name: "index_course_meals_on_meal_id"
  end

  create_table "courses", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ingredients", force: :cascade do |t|
    t.text "calories"
    t.text "protein"
    t.text "carbs"
    t.text "fat"
    t.text "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "meals", force: :cascade do |t|
    t.string "name"
    t.bigint "ingredient_id"
    t.bigint "course_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_meals_on_course_id"
    t.index ["ingredient_id"], name: "index_meals_on_ingredient_id"
  end

  create_table "recipe_ingredients", force: :cascade do |t|
    t.bigint "meal_id"
    t.bigint "ingredient_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ingredient_id"], name: "index_recipe_ingredients_on_ingredient_id"
    t.index ["meal_id"], name: "index_recipe_ingredients_on_meal_id"
  end

  create_table "units", force: :cascade do |t|
    t.integer "cup"
    t.integer "tbsp"
    t.integer "tsp"
    t.integer "pint"
    t.integer "quart"
    t.integer "gallon"
    t.integer "pound"
    t.integer "grams"
    t.integer "ounces"
    t.integer "item"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_meals", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "meal_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["meal_id"], name: "index_user_meals_on_meal_id"
    t.index ["user_id"], name: "index_user_meals_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "name"
    t.string "image_url"
    t.integer "weight"
    t.integer "height"
    t.integer "carb_goal"
    t.integer "protein_goal"
    t.integer "fat_goal"
    t.float "activity_level"
    t.float "bmi"
    t.integer "weight_goal"
    t.boolean "is_new"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "course_meals", "courses"
  add_foreign_key "course_meals", "meals"
  add_foreign_key "meals", "courses"
  add_foreign_key "meals", "ingredients"
  add_foreign_key "recipe_ingredients", "ingredients"
  add_foreign_key "recipe_ingredients", "meals"
  add_foreign_key "user_meals", "meals"
  add_foreign_key "user_meals", "users"
end
