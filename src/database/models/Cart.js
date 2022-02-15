module.exports = (sequelize, DataTypes) => {

    const alias = "Cart";

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        total: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    }

    const config = {
        tableName: 'carts',
        timestamps: true
    }

    const Cart = sequelize.define(alias, cols, config)

    //Relaciones
    Cart.associate = (models) => {
        
        // Con User
        Cart.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        })

        // Con Product
        Cart.belongsToMany(models.Product, {
            as: 'products',
            foreignKey: 'cart_id',
            otherKey: 'product_id',
            through: 'cart_product',
            timestamps: true
        })
    }

    return Cart

}