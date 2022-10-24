class Family < ApplicationRecord
  has_secure_password
  has_many :events

  validates :email, uniqueness: true
end
