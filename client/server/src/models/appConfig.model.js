// models/appConfig.js

export default (sequelize, DataTypes) => {
    const AppConfig = sequelize.define("AppConfig", {
      key: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      value: {
        type: DataTypes.JSONB, // Perfect for storing arrays like category IDs or product IDs
        allowNull: false,
      },
    });
  
    return AppConfig;
  };
  