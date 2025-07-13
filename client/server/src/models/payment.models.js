export default (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: { args: [0], msg: 'Amount must be non-negative' },
      },
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Payment method is required' },
      },
    },
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending',
      validate: {
        isIn: {
          args: [['Pending', 'Paid', 'Failed']],
          msg: 'Invalid payment status',
        },
      },
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true, // might be null if payment hasn't started yet
    },
    paidAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Order, {
      foreignKey: { allowNull: false },
      onDelete: 'CASCADE',
    });
  };

  return Payment;
};
