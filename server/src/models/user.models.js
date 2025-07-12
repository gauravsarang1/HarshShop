import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Name is required' },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: { msg: 'Must be a valid email address' },
          notEmpty: { msg: 'Email is required' },
        },
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Password is required' },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'Customer',
      },
    },
    {
      hooks: {
        beforeValidate: (user) => {
          trimFields(user);
        },
        beforeCreate: async (user) => {
          await hashPassword(user);
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            await hashPassword(user);
          }
        },
      },
    }
  );

  // 🔗 Associations
  User.associate = (models) => {
    User.hasMany(models.Order);
    User.hasMany(models.Address);
    User.hasMany(models.Review);
    User.hasMany(models.Wishlist);
    User.hasOne(models.Cart);
    User.hasMany(models.Brand);
  };

  // 🔐 Password check
  User.prototype.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  // 🔑 Access Token
  User.prototype.getAccessToken = function () {
    return jwt.sign(
      {
        id: this.id,
        name: this.name,
        email: this.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d',
      }
    );
  };

  // 🔁 Refresh Token
  User.prototype.getRefreshToken = function () {
    return jwt.sign(
      {
        id: this.id,
        name: this.name,
        email: this.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d',
      }
    );
  };

  return User;
};

// 🔧 Utility: Password Hasher
async function hashPassword(user) {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
}

// 🔧 Utility: Trim string fields (works with Sequelize instances)
function trimFields(user) {
  for (const key of Object.keys(user.dataValues)) {
    if (typeof user[key] === 'string') {
      user[key] = user[key].trim();
    }
  }
}
