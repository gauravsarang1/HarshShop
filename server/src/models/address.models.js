export default (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Full name is required' },
      },
    },
    addressLine1: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Address Line 1 is required' },
      },
    },
    addressLine2: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'City is required' },
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'State is required' },
      },
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Postal code is required' },
        len: { args: [4, 10], msg: 'Postal code must be between 4 and 10 characters' },
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Country is required' },
      },
    },
  });

  Address.associate = (models) => {
    Address.belongsTo(models.User, {
      foreignKey: { allowNull: false },
      onDelete: 'CASCADE',
    });
  };

  return Address;
};
