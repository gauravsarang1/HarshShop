// models/category.js

export default (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isUrl: { msg: "Must be a valid image URL" },
      },
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    trending: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    itemCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  Category.associate = models => {
    Category.hasMany(models.Product, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return Category;
};
