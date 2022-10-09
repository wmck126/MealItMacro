Rails.application.routes.draw do

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :users do
    resources :user_meals
  end
  
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  patch "/createProfile", to: "users#update"

  post "/login", to: "sessions#create"
  delete "logout", to: "sessions#destroy"

  resources :user_meals

  
  
  resources :meals do
    resources :total_macros, only: [:index, :show]
  end

  resources :ingredients, only: [:index, :show]
  resources :total_macros

  resources :courses, only: [:index, :show] do
    resources :meals, only: [:index, :show]
  end


  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }


end
