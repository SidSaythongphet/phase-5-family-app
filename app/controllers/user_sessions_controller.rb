class UserSessionsController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def create
    user = User.find_by(user_params)
    session[:user_id] = user.id 
    render json: user, status: :created
  end

  def destroy
    session.delete :user_id
    head :no_content
  end

  private

  def user_params
    params.require(:user).permit(:name, :id)
  end
    
end
