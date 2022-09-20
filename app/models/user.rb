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

  validates :username, format: USERNAME_REQUIREMENTS, uniqueness: true
  validates :password, format: PASSWORD_REQUIREMENTS
  has_secure_password

  
end
