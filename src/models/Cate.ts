import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/connectDB';

class Cate extends Model {}

Cate.init(
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
    },
    {
        sequelize,
        modelName: 'Cate',
    },
);

export default Cate;
