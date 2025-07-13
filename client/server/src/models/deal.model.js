// models/deal.js

export default (sequelize, DataTypes) => {
    const Deal = sequelize.define("Deal", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: { isDecimal: true, min: 0 },
      },
      originalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: { isDecimal: true, min: 0 },
      },
      type: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          notEmpty: true,
          isValidTypeArray(value) {
            const allowed = ["Flash Sale", "Bundle", "Clearance"];
            const invalid = value.filter(v => !allowed.includes(v));
            if (invalid.length) {
              throw new Error(`Invalid deal types: ${invalid.join(", ")}`);
            }
          }
        }
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: { isUrl: { msg: "Must be a valid image URL" } },
      },
      endsAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      }
    });
  
    return Deal;
  };
  