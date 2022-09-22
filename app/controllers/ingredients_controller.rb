class IngredientsController < ApplicationController
skip_before_action :authorize
  def create
    user = Ingredient.create!(ingredient_params)
    render json: user, status: :created
  end

  def index
    user = Ingredient.all
    render json: user
  end
  
  def show
    user = Ingredient.find(params[:id])
    render json: user, status: :ok
  end

  private

  def ingredient_params
    params.permit(:calories, :protein, :carbs, :fat, :name)
  end
end
