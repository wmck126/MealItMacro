class TotalMacrosController < ApplicationController
  skip_before_action :authorize
  def create
    macros = TotalMacro.create!(macro_params)
    meal = Meal.create!(meal_params)
    render json: {meal: meal, macros: macros}
  end

  def index
    if params[:meal_id]
      meal = Meal.find(params[:meal_id])
      macros = meal.total_macro
    else
      macros = TotalMacro.all
    end
    render json: macros, include: :meal
  end
  
  def show
    macros = TotalMacro.find(params[:id])
    render json: macros, status: :ok
  end

  private

  def macro_params
    params.permit(:calories, :carbs, :protein, :fat, :serving_calories)
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
