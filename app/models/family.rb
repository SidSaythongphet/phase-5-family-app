class Family < ApplicationRecord
  has_secure_password
  has_many :events
  has_many :users
  accepts_nested_attributes_for :users

  validates :email, uniqueness: true

end
