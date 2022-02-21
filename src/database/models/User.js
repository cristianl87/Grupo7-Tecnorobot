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
        role_id: {
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

    //Relaciones
    User.associate = (models) => {
        //Relación con Role
        User.belongsTo(models.Role, {
            as: 'role',
            foreignKey: 'role_id'
        })

        //Relación con Cart
        User.hasMany(models.Cart, {
            as: 'carts',
            foreignKey: 'user_id'
        })
    }

    return User

}