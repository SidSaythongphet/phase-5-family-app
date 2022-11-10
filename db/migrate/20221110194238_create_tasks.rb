class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.references :task_for, polymorphic: true, null: false
      t.boolean :completed, default: false, null: false

      t.timestamps
    end
  end
end
