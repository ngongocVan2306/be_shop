import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/connectDB';
import Product from './Product';

class Image extends Model {}

Image.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        img_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Image',
    },
);

Image.belongsTo(Product, {
    foreignKey: 'product_id',
    targetKey: 'id',
    as: 'productData',
});

Product.hasMany(Image, {
    foreignKey: 'product_id',
    as: 'imageData',
});
export default Image;
