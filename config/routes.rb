Rails.application.routes.draw do
  
  scope :api do
    post "/signup", to: "families#create"
    get "/family", to: "families#show"
    delete "/logout", to: "sessions#destroy"
    post "/login", to: "sessions#create"
    post "/user_login", to: "user_sessions#create"
    get "/user", to: "users#show"
    get "/past_events", to: "past_events#index"
    resources :families, only: [:index, :show, :create]
    resources :users, only: [:index, :show, :create]
    resources :users do
      resources :events
      resources :tasks
      resources :user_tasks
    end
    resources :events, only: [:index, :create, :update, :destroy]
    resources :tasks, only: [:index, :create, :update, :destroy]
    resources :user_tasks, only: [:destroy]
  end

end
