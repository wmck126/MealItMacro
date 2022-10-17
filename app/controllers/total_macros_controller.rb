class TotalMacrosController < ApplicationController
  def create
    meal = Meal.new(meal_params)
    meal.id = Meal.last.id + 1
    meal.save
    macros = TotalMacro.new(macro_params)
    macros.meal_id = meal.id
    macros.save
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
