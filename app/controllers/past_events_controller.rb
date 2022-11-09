class PastEventsController < ApplicationController
  def index
    family = Family.find_by(id: session[:family_id])
    @events = family.events.all.where("start < ?", Time.new)
    @events.each do |event| 
      event.color = event.user.color.paint.greyscale.lighten(10).to_hex
      event
    end
    render json: @events, status: :ok
  end
end
