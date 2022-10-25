class FamilySerializer < ActiveModel::Serializer
  attributes :id, :last_name, :email
  has_many :events
  has_many :users
end
