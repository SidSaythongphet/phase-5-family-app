class User < ApplicationRecord
  belongs_to :family
  has_many :events
  has_many :tasks, as: :task_for

  validates :name, uniqueness: true
end
