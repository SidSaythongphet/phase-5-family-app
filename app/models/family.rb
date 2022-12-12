class Family < ApplicationRecord
  has_secure_password
  has_many :events
  has_many :users
  accepts_nested_attributes_for :users

  validates_presence_of :last_name, :email 
  validates_uniqueness_of :email, case_sensitive: false

end
