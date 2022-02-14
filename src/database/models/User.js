module.exports = (sequelize, DataTypes) => {

    const alias = "User";

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.INTEGER
        },
        address: {
            type: DataTypes.STRING
        },
        avatar: {
            type: DataTypes.STRING
        },
        rol_id: {
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
        tableName: 'users',
        timestamps: true
    }

    const User = sequelize.define(alias, cols, config)

    return User

}