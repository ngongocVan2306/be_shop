import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/connectDB';
import User from './User';
import Product from './Product';

class Product_User extends Model {}

Product_User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Product_User',
    },
);

Product_User.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id',
    as: 'userData',
});
Product_User.belongsTo(Product, {
    foreignKey: 'product_id',
    targetKey: 'id',
    as: 'productData',
});

export default Product_User;
