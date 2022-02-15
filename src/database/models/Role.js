module.exports = (sequelize, DataTypes) => {

    const alias = "Role";

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
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
        tableName: 'roles',
        timestamps: true
    }

    const Role = sequelize.define(alias, cols, config);

    //Relaciones
    Role.associate = (models) => {
        Role.hasMany(models.User, {
            as: 'users',
            foreignKey: 'role_id'
        })
    }

    return Role

}