class Task < ApplicationRecord
  belongs_to :task_for, polymorphic: true
end
