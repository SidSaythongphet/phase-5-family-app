class TasksController < ApplicationController

  def index
    family = Family.find_by(id: session[:family_id])
    @family_tasks = family.tasks.all
    user = User.find_by(id: session[:user_id])
    @user_tasks = user.tasks.all
    render json: { family_tasks: @family_tasks, user_tasks: @user_tasks }, status: :ok
  end

  def create
    @task = Task.create!(task_params)
    if @task.valid?
      render json: @task, status: :created
    end
  end

  def update
    @task = find_task
    if @task.update!(task_params)
      render json: @task, status: :accepted
    end
  end

  def destroy

  end

  private

  def find_task
    Task.find_by(id: params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :task_for_type, :task_for_id, :completed)
  end

  def render_not_found_response
    render json: { error: "Event not found" }, status: :not_found 
  end
end
