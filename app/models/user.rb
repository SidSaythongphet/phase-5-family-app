class User < ApplicationRecord
  belongs_to :family
  has_many :events
  has_many :user_tasks
  has_many :tasks, through: :user_tasks

  validates :name, uniqueness: true
  validates :name, format: { with: /\A[a-zA-Z]+\z/,
    message: "Only allows letters" }
  validates_presence_of :name, :family_id
end
