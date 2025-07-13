

export default (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
      validate: {
        min: { args: [1], msg: 'Quantity must be at least 1' },
        isInt: { msg: 'Quantity must be an integer' },
      },
    },
  }, {
    hooks: {
      afterCreate: async (cartItem) => {
        await updateCategoryTrending(cartItem.ProductId, sequelize)
      },
      afterDestroy: async (cartItem) => {
        await updateCategoryTrending(cartItem.ProductId, sequelize)
      }
    }
  });

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Product, {
      foreignKey: { allowNull: false },
      onDelete: 'CASCADE',
    });

    CartItem.belongsTo(models.Cart, {
      foreignKey: { allowNull: false },
      onDelete: 'CASCADE',
    });
  };

  return CartItem;
};

const updateCategoryTrending = async (productId, sequelize) => {
  if(!productId) return;
  const cartItemsCount = await sequelize.models.CartItem.count({
    where: {
      ProductId: productId
    }
  })
  const product = await sequelize.models.Product.findByPk(productId)
  if(product) {
    const category = await sequelize.models.Category.findByPk(product.CategoryId)
    if(category) {
      await category.update({
        trending: cartItemsCount > 5 ? true : false
      })
    }
  }
}