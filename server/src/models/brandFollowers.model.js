export default (sequelize, DataTypes) => {
    const BrandFollowers = sequelize.define("BrandFollowers", {

    });
    BrandFollowers.associate = (models) => {
        BrandFollowers.belongsTo(models.Brand, {
            foreignKey: 'BrandId',
            allowNull: false,
            onDelete: 'CASCADE',
        });
        BrandFollowers.belongsTo(models.User, {
            foreignKey: 'UserId',
            allowNull: false,
            onDelete: 'CASCADE',
        });
    }

    return BrandFollowers;
}