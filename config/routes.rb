Rails.application.routes.draw do
  
  scope :api do
    post "/signup", to: "families#create"
    get "/family", to: "families#show"
    delete "/logout", to: "sessions#destroy"
    post "/login", to: "sessions#create"
    resources :families, only: [:index, :show, :create]
    resources :events, only: [:index, :create]
  end

end
