class Event < ApplicationRecord
  attribute :color

  belongs_to :family
  belongs_to :user

  validates_presence_of :title, :start, :end, :family_id, :user_id
end
