import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/connectDB';

class Product extends Model {}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        inventory: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Product',
    },
);

export default Product;
