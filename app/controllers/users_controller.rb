class UsersController < ApplicationController
  skip_before_action :authorize, only: [:index, :create, :update]

  def create
    user = User.create!(user_params)
    render json: user, status: :created
  end

  def index
    user = User.all
    render json: user
  end
  
  def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: user, status: :ok
    else
      render json: {error: "Not authorized"}, status: :unauthorized
    end
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


  
  
  private

  def user_params
    params.permit(:username, 
    :password, 
    :password_confirmation,
    )
  end

  def profile_params
    params.require(:user).permit(:id, :name, :image_url, :weight, :height, :carb_goal, :protein_goal, :fat_goal, :activity_level, :bmi, :weight_goal)
  end
end
