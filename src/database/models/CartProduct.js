// Tabla pivot Cart-Product

const Cart = require("./Cart");

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

    //Relaciones
    CartProduct.associate = (models) => {
        CartProduct.belongsTo(models.Cart, {
            foreignKey: 'cart_id'
        });

        CartProduct.belongsTo(models.Product, {
            foreignKey: 'product_id'
        })
    }

    return CartProduct

}