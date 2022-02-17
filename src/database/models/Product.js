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
        isDeleted: {
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

    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {
        //Relación con categorías 
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id'
        });

        //Relación con divisas 
        Product.belongsTo(models.Currency, {
            as: 'currency',
            foreignKey: 'currency_id'
        })

        //Relación con Cart
        Product.belongsToMany(models.Cart, {
            as: 'carts',
            foreignKey: 'product_id',
            otherKey: 'cart_id',
            through: 'cart_product',
            timestamps: true
        })
    }

    return Product

}