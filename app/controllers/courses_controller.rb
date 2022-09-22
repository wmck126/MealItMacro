class CoursesController < ApplicationController
  skip_before_action :authorize
  def create
    user = Course.create!(course_params)
    render json: user, status: :created
  end

  def index
    user = Course.all
    render json: user
  end
  
  def show
    user = Course.find(params[:id])
    render json: user, status: :ok
  end

  private

  def course_params
    params.permit(:name)
  end
end
