class SetDefault < ActiveRecord::Migration[7.0]
  def change
    change_column :users, :is_new, :boolean, default: true
  end
end
