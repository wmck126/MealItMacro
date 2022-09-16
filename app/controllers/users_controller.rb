class UsersController < ApplicationController
  skip_before_action :authorize, only: :create
  def create
    user = User.create(user_params)
    render json: user, status: :created
  end

  def index
    user = User.all
    render json: user
  end
  
  def show
    user = User.find_by(params[:id])
    render json: user, status: :ok
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation)
  end
end
