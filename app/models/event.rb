class Event < ApplicationRecord
  attribute :color

  belongs_to :family
  belongs_to :user


end
