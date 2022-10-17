class MealsController < ApplicationController
  def create
    meal = Meal.new(meal_params)
    meal.id = Meal.last.id + 1
    meal.save
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
