class TasksController < ApplicationController
  skip_before_action :authorize, only: [:show]

  def index
    user = User.find_by(id: params[:user_id])
    @tasks = user.tasks.all
    render json: @tasks, status: :ok
  end

  def show 
    task = Task.find_by(id: params[:id])
    render json: task, status: :ok
  end

  def create
    @task = Task.create!(task_params)
    params.fetch(:user_ids, []).each do |user_id|
      user = User.find_by(id: user_id)
      @task.users << user
    end
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
    @task = find_task
    if @task
      @task.destroy
      render json: {}
    else
      render_not_found_response
    end
  end

  private

  def find_task
    Task.find_by(id: params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :completed, { user_ids: [] })
  end

  def render_not_found_response
    render json: { error: "Task not found" }, status: :not_found 
  end
end
