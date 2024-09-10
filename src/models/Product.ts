import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/connectDB';
import Cate from './Cate';

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
            allowNull: false,
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        inventory: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Product',
    },
);

Product.belongsTo(Cate, {
    foreignKey: 'type',
    targetKey: 'id',
    as: 'CateData',
});

export default Product;
