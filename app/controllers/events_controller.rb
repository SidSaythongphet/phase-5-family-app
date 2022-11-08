class EventsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response


  def index
    family = Family.find_by(id: session[:family_id])
    @events = family.events.all
    @events.each do |event| 
      event.color = event.user.color
      event
    end
    render json: @events, status: :ok
  end

  def create
    family = Family.find_by(id: session[:family_id])
    @event = family.events.create!(event_params)
    if @event.valid?
      render json: @event, status: :created 
    end
  end
  
  def destroy
    @event = find_event
    if @event
      @event.destroy
      render json: {}
    else
      render_not_found_response
    end
  end

  private

  def find_event
    Event.find_by(id: params[:id])
  end

  def event_params
    params.require(:event).permit(:title, :start, :end, :allDay, :family_id, :user_id, :note)
  end

  def render_not_found_response
    render json: { error: "Event not found" }, status: :not_found 
  end
end
