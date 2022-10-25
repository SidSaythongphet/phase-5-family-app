class SessionsController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def create
    family = Family.find_by(email: params[:email])
    if family&.authenticate(params[:password])
      session[:family_id] = family.id 
      render json: family, status: :created
    else
      render json: { errors: ["Invalid email or password"] }, status: :unauthorized
    end
  end

  def destroy
    session.delete :family_id
    session.delete :user_id
    head :no_content
  end
end
