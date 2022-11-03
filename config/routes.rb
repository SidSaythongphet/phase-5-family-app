Rails.application.routes.draw do
  
  scope :api do
    post "/signup", to: "families#create"
    get "/family", to: "families#show"
    delete "/logout", to: "sessions#destroy"
    post "/login", to: "sessions#create"
    post "/user_login", to: "user_sessions#create"
    get "/user", to: "users#show"
    resources :families, only: [:index, :show, :create]
    resources :users, only: [:index, :show, :create]
    resources :events, only: [:index, :create, :destroy]
  end

end
