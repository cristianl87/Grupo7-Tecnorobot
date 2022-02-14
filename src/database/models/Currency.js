module.exports = (sequelize, DataTypes) => {

    const alias = "Currency";

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(45)
        },
        symbol: {
            type: DataTypes.STRING(45),
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
        tableName: 'currencies',
        timestamps: true
    }

    const Currency = sequelize.define(alias, cols, config)

    return Currency

}