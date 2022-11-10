class Family < ApplicationRecord
  has_secure_password
  has_many :events
  has_many :users
  has_many :tasks, as: :task_for
  accepts_nested_attributes_for :users

  validates :email, uniqueness: true

end
