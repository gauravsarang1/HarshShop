export default (sequelize, DataTypes) => {
  const Wishlist = sequelize.define(
    'Wishlist',
    {},
    {
      indexes: [
        {
          unique: true,
          fields: ['UserId', 'ProductId'],
        },
      ],
    }
  );

  Wishlist.associate = (models) => {
    Wishlist.belongsTo(models.User, {
      foreignKey: { allowNull: false },
      onDelete: 'CASCADE',
    });

    Wishlist.belongsTo(models.Product, {
      foreignKey: { allowNull: false },
      onDelete: 'CASCADE',
    });
  };

  return Wishlist;
};
