import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/connectDB';

class AllCode extends Model {}

AllCode.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'AllCode',
    },
);

export default AllCode;
