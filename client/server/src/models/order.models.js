export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: { args: [0], msg: 'Total amount must be non-negative' },
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending',
      validate: {
        isIn: {
          args: [['Pending', 'Shipped', 'Delivered', 'Cancelled', 'Processing']],
          msg: 'Invalid order status',
        },
      },
    },
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unPaid',
      validate: {
        isIn: {
          args: [['unPaid', 'Paid', 'Failed']],
          msg: 'Invalid payment status',
        },
      },
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: { allowNull: false },
      onDelete: 'CASCADE',
    });

    Order.hasMany(models.OrderItem, {
      onDelete: 'CASCADE',
    });

    Order.hasOne(models.Payment, {
      onDelete: 'CASCADE',
    });
  };

  return Order;
};
