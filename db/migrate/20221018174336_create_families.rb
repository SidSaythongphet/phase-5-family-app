class CreateFamilies < ActiveRecord::Migration[7.0]
  def change
    create_table :families do |t|
      t.string :last_name
      t.string :email
      t.string :password_digest

      t.timestamps
    end
  end
end
