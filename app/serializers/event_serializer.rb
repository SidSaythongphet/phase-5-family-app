class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :start, :end, :allDay, :note
  has_one :family
end
