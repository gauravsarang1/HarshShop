export default (sequelize, DataTypes) => {
    const Brand = sequelize.define("Brand", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      logo: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          isUrl: { msg: "Logo must be a valid URL" },
        },
      },
      coverImage: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          isUrl: { msg: "Cover image must be a valid URL" },
        },
      },
      rating: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: true,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 5,
        },
      },
      products: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      followers: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      story: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      values: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
      },
      stats: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: {},
      },
      sociallinks: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: {},
      },
    });
  
    Brand.associate = models => {
      Brand.belongsTo(models.User, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE",
      });
      Brand.belongsTo(models.Category, {
        foreignKey: { allowNull: false },
        onDelete: "CASCADE"
      })
      Brand.hasMany(models.Product, { onDelete: "CASCADE" });
    };
  
    return Brand;
  };
  