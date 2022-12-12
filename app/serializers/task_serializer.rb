class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :completed
  has_many :users
end
