Rails.application.routes.draw do
  
  scope :api do
    resources :families, only: [:index, :show, :create]
  end

end
