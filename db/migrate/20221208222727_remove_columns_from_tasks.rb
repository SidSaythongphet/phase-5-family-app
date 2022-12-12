class RemoveColumnsFromTasks < ActiveRecord::Migration[7.0]
  def change
    remove_column :tasks, :task_for_type, :string
    remove_column :tasks, :task_for_id, :integer
  end
end
