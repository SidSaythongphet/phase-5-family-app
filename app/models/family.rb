class Family < ApplicationRecord
  has_secure_password
  has_many :events
  has_many :users

  validates :email, uniqueness: true
end
