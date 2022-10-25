class User < ApplicationRecord
  belongs_to :family
  has_many :events
end
