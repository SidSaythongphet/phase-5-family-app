class EventsController < ApplicationController

  def index
    family = Family.find_by(id: session[:family_id])
    @events = family.events.all
    render json: @events, status: :ok
  end

  def create
    family = Family.find_by(id: session[:family_id])
    @event = family.events.create!(event_params)
    if @event.valid?
      render json: @event, status: :created 
    end
  end

  private

  def find_event
    Event.find_by(id: params[:id])
  end

  def event_params
    params.require(:event).permit(:title, :start, :end, :allDay, :family_id, :user_id, :note)
  end
end
