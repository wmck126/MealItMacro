class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true, length: {minimum: 5}
  #validates :password, presence: true, length: {minimum: 7}
  has_secure_password
end
