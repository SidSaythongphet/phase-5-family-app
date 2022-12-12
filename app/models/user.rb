class User < ApplicationRecord
  belongs_to :family
  has_many :events
  has_many :user_tasks
  has_many :tasks, through: :user_tasks

  validates :name, uniqueness: true
end
