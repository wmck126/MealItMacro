Rails.application.routes.draw do

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  patch "/createProfile", to: "users#update"

  post "/login", to: "sessions#create"
  delete "logout", to: "sessions#destroy"

  resources :user_meals, only: [:index, :show, :create]

  resources :users 
  
  resources :meals do
    get 'meal_counter', :on => :collection
    resources :total_macros, only: [:index, :show]
  end

  resources :total_macros, only: [:index, :show]

  resources :total_macros

  

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }


end
