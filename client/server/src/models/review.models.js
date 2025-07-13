export default (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { args: [1], msg: 'Rating must be at least 1' },
        max: { args: [5], msg: 'Rating must be at most 5' },
        isInt: { msg: 'Rating must be an integer' },
        notNull: { msg: 'Rating is required' },
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Comment is required' },
      },
    },
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: { allowNull: false },
      onDelete: 'CASCADE',
    });

    Review.belongsTo(models.Product, {
      foreignKey: { allowNull: false },
      onDelete: 'CASCADE',
    });
  };

  return Review;
};
