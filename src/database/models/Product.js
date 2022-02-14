module.exports = (sequelize, DataTypes) => {

    const alias = "Product";

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
        price: {
            type: DataTypes.DECIMAL
        },
        freeShipping: {
            type: DataTypes.BOOLEAN
        },
        isPublished: {
            type: DataTypes.BOOLEAN
        },
        isFeatured: {
            type: DataTypes.BOOLEAN
        },
        mainImage: {
            type: DataTypes.STRING
        },
        gallery: {
            type: DataTypes.STRING(400)
        },
        description: {
            type: DataTypes.STRING(400)
        },
        currency_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        category_id: {
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
        tableName: 'products',
        timestamps: true
    }

    const Product = sequelize.define(alias, cols, config)

    return Product

}