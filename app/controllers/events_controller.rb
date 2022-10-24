class EventsController < ApplicationController

  def index
    family = Family.find_by(id: session[:family_id])
    @events = family.events.all
    render json: @events, status: :ok
  end

  def create
    family = Family.find_by(id: session[:family_id])
    @event = family.events.build(family_params)
    if @event.valid?
      @event.save
      render json: @event, status: :created 
    end
  end

  private

  def find_event
    Event.find_by(id: params[:id])
  end

  def family_params
    params.require(:event).permit(:title, :start, :end, :allDay, :family_id, :note)
  end
end
