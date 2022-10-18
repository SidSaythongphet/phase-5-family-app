class FamiliesController < ApplicationController
  def index
    @families = Family.all
    render json: @families, status: :ok
  end

  def show 
    @family = find_family
    render json: @family, status: :ok
  end

  def create
    @family = Family.create!(family_params)
    if @family.valid?
      session[:family_id] = family.id 
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
