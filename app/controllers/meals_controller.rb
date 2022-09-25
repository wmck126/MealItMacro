class MealsController < ApplicationController
  skip_before_action :authorize
  def create
    meal = Meal.create!(meal_params)
    render json: meal, status: :created
  end

  def index
      meal = Meal.all
      render json: meal
  end
  
  def macros_index
    meal = find_meal()
    macros = meal.total_macros
    render json: macros, include: :meal
  end

  def show
    meal = find_meal()
    render json: meal, status: :ok
  end

  #Most likely won't need this, macros takes 
  def serving_calories
    specific_meal = find_meal()
    calories = specific_meal["calories"]
    serving_size = specific_meal["yield"]
    servCals = calories / serving_size
    render json: servCals and return
  end

  private

  def find_meal
    Meal.find(params[:id])
  end

  def meal_params
    params.permit(
      :name,
      :image_url,
      :recipe_url,
      :yield,
      :calories,
      :meal_type,
      :dish_type,)
  end
end
