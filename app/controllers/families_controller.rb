class FamiliesController < ApplicationController
  wrap_parameters :family, include: [:last_name, :email, :password, :password_confirmation]
  skip_before_action :authorize, only: [:create]

  def index
    @families = Family.all
    render json: @families, status: :ok
  end

  def show 
    family = Family.find_by(id: session[:family_id])
    if family
      render json: family, include: ['users', 'events', 'events.user.color'], status: :ok
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def create
    @family = Family.create!(family_params)
    @family.users.create!(name: params[:name], color: "#ff0000")
    if @family.valid?
      session[:family_id] = @family.id 
      render json: @family, status: :created
    end
  end

  private

  def find_family
    Family.find_by(id: params[:id])
  end

  def family_params
    params.require(:family).permit(:last_name, :email, :password, :password_confirmation)
  end

end
