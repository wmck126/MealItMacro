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

ActiveRecord::Schema[7.0].define(version: 2022_09_24_141522) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "courses", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "meals", force: :cascade do |t|
    t.string "name"
    t.string "image_url"
    t.string "recipe_url"
    t.integer "yield"
    t.float "calories"
    t.string "meal_type"
    t.string "dish_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "total_macros", force: :cascade do |t|
    t.float "calories"
    t.float "carbs"
    t.float "protein"
    t.float "fat"
    t.bigint "meal_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["meal_id"], name: "index_total_macros_on_meal_id"
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

  add_foreign_key "total_macros", "meals"
  add_foreign_key "user_meals", "meals"
  add_foreign_key "user_meals", "users"
end
