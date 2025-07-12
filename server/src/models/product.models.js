// models/product.js

export default (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Product name cannot be empty" },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
    discountedPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    features: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCreate: (product) => {
        if (!product.discountedPrice) {
          product.discountedPrice = product.price;
        }
      },
      beforeUpdate: (product) => {
        if (!product.discountedPrice) {
          product.discountedPrice = product.price;
        }
      },
      afterDestroy: async (product) => {
        await updateCategoryItemCount(product.CategoryId, sequelize)
      },
      afterCreate: async (product) => {
        await updateCategoryItemCount(product.CategoryId, sequelize)
      }
    }
  });

  Product.associate = models => {
    Product.belongsTo(models.Category, {
      foreignKey: { allowNull: false },
      onDelete: 'CASCADE',
    });
    Product.belongsTo(models.Brand, {
      foreignKey: { allowNull: false },
      onDelete: 'CASCADE',
    });
    Product.hasMany(models.Review, { onDelete: 'CASCADE' });
    Product.hasMany(models.CartItem, { onDelete: 'CASCADE' });
    Product.hasMany(models.OrderItem, { onDelete: 'CASCADE' });
    Product.hasMany(models.Wishlist, { onDelete: 'CASCADE' });
  };

  return Product;
};

//utility function 
const updateCategoryItemCount = async (categoryId, sequelize) => {
  if(!categoryId) return;
  const productCount = await sequelize.models.Product.count({
    where: {
      CategoryId: categoryId
    }
  })
  const category = await sequelize.models.Category.findByPk(categoryId)
  if(category) {
    await category.update({
      itemCount: productCount
    })
  }
}
