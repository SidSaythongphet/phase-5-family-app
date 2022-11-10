class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :completed, :task_for_type
  has_one :task_for
end
