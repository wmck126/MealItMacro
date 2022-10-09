class UsersController < ApplicationController
skip_before_action :authorize, only: [:create, :update, :show, :delete]
  def create
    user = User.create!(user_params)
    render json: user, status: :created
  end

  def index
    user = User.all
    render json: user
  end
  
  def show
    user = User.find_by(id: params[:id])
    render json: user, status: :ok
  end

  def update
    user = User.find_by(id: params[:id])
    if user
      user.update!(profile_params)
      render json: user
    else 
      render json: {error: "User not found"}, status: :not_found
    end
  end

  def destroy
    user = User.find_by(id: params[:id])
    user.delete
    head :no_content
  end


  
  
  private

  def user_params
    params.permit(:username, 
    :password, 
    :password_confirmation,
    )
  end

  def profile_params
    params.require(:user).permit(:id, :username, :name, :weight, :height, :carb_goal, :protein_goal, :fat_goal, :activity_level, :bmi, :weight_goal, :gender, :goal_cals, :carb_grams, :protein_grams, :fat_grams)
  end
end
