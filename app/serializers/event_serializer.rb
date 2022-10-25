class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :start, :end, :allDay, :note, :family_id, :user_id
end
