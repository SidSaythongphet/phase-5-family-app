class FamilySerializer < ActiveModel::Serializer
  attributes :id, :last_name, :email
  has_many :events, serializer: EventSerializer
  has_many :users
end
