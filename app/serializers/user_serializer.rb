class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :color
  has_one :family
end
