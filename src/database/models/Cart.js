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

    return Cart

}