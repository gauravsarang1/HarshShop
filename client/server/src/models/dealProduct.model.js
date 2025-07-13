export default (sequelize, DataTypes) => {
    const DealProduct = sequelize.define("DealProduct", {
        saleName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salePrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        saleQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        endsAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    });

    DealProduct.associate = (models) => {
        DealProduct.belongsTo(models.Deal, {
            foreignKey: { allowNull: false },
            onDelete: 'CASCADE',
        });
        DealProduct.belongsTo(models.Product, {
            foreignKey: { allowNull: false },
            onDelete: 'CASCADE',
        });
    };

    return DealProduct;
};