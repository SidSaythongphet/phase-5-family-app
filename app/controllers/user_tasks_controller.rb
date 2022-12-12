class UserTasksController < ApplicationController

  def show 
    user = User.find_by(id: params[:user_id])
    user_task = user.user_tasks.find_by(task_id: params[:id])
    render json: user_task, status: :ok
  end

  def destroy
    user = User.find_by(id: session[:user_id])
    @user_task = user.user_tasks.find_by(task_id: params[:id])
    if @user_task
      @user_task.destroy
      render json: {}
    else
      render_not_found_response
    end
  end

  private

  def user_tasks_params
    params.require(:user_task).permit(:task_id)
  end

  def render_not_found_response
    render json: { error: "Join table not found" }, status: :not_found 
  end

end
