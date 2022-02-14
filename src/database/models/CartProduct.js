module.exports = (sequelize, DataTypes) => {

    const alias = "CartProduct";

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cart_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    }

    const config = {
        tableName: 'cart_product',
        timestamps: true
    }

    const CartProduct = sequelize.define(alias, cols, config)

    return CartProduct

}