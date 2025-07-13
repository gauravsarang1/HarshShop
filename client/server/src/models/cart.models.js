export default (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
      allowNull: false
    }
    // Optional: Add timestamps or status fields here if needed
    // e.g., status: DataTypes.STRING
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, {
      foreignKey: { allowNull: false },
      onDelete: 'CASCADE',
    });

    Cart.hasMany(models.CartItem, {
      onDelete: 'CASCADE',
    });
  };

  return Cart;
};
