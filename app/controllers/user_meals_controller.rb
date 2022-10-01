class UserMealsController < ApplicationController
  
  def create
    user_meal = UserMeal.create!(user_meal_params)
    render json: user_meal, status: :created
  end

  def index
    user_meal = UserMeal.all
    render json: user
  end
  
  def show
    user = UserMeal.find_by(id: session[:user_id])
    if user
      render json: user, status: :ok
    else
      render json: {error: "Not authorized"}, status: :unauthorized
    end
  end

  private

  def user_meal_params 
    params.permit(:user_id, :meal_id)
  end

end
