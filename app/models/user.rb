class User < ApplicationRecord
  belongs_to :family
  has_many :events

  validates :name, uniqueness: true
end
