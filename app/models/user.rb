class User < ApplicationRecord
  PASSWORD_REQUIREMENTS = /\A
  (?=.{6,}) #At least 6 characters
  (?=.*\d) #At least 1 number
  (?=.*[a-z]) #At least 1 lowercase letter
  (?=.*[A-Z]) #At least 1 uppercase letter
  /x

  USERNAME_REQUIREMENTS = /\a
  (?=.{5,}) #At least 5 characters
  /x

  validates :username, uniqueness: true, presence: true
  #validates :password, format: PASSWORD_REQUIREMENTS
  ## Some reason password will not allow PATCH requests go through
  has_secure_password
  has_many :user_meals
  has_many :meals, through: :user_meals
end
