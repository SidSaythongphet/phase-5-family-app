class UsersController < ApplicationController

  def index
    family = Family.find_by(id: session[:family_id])
    @users = family.users.all
    render json: @users, status: :ok
  end

  def show 
    user = User.find_by(id: session[:user_id])
    if user
      render json: user, status: :ok
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def create
    @family = Family.find_by(id: session[:family_id])
    if @family.valid?
      user = @family.users.create!(user_params)
      render json: user, status: :created
    end
  end

  private

  def find_user
    User.find_by(id: params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :family_id, :color)
  end

end
