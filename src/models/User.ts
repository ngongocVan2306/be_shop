import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/connectDB';
import AllCode from './AllCode';
import { role } from '~/utils/enum';

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        age: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        gender: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
    },
);

// User.belongsTo(AllCode, {
//     foreignKey: 'role',
//     targetKey: 'id',
//     as: 'AllCodeData',
// });

export default User;
