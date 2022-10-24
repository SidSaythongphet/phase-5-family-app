class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.string :title
      t.string :start
      t.string :end
      t.boolean :allDay
      t.string :note
      t.belongs_to :family, null: false, foreign_key: true

      t.timestamps
    end
  end
end
