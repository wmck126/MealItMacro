class MealsController < ApplicationController
  skip_before_action :authorize
  def create
    meal = Meal.create!(meal_params)
    render json: meal, status: :created
  end

  def index
    if params[:ingredient_id] || params[:course_id]
      ingredients = Ingredient.find(params[:ingredient_id])
      courses = Course.find(params[:course_id])
      meals = ingredients.meals && courses.meals
    else
      meal = Meal.all
    end
      render json: meal, include:  [:ingredient, :course]
  end
  
  def show
    meal = Meal.find(params[:id])
    render json: meal, status: :ok
  end

  private

  def meal_params
    params.permit(:name, :ingredient_id, :course_id)
  end
end
