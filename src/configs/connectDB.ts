import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('shop', 'root', undefined, {
    dialect: 'mysql',
    host: 'localhost',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true,
    },
    logging: false,
});

export default async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// export const sequelize = new Sequelize('bkhyolwqd76qiibljtzz', 'utqeiigwqkav7zwd', 'm2EbljFmmh4PjxHtD0Zq', {
//     dialect: 'mysql',
//     host: 'bkhyolwqd76qiibljtzz-mysql.services.clever-cloud.com',
//     define: {
//         charset: 'utf8',
//         collate: 'utf8_general_ci',
//         timestamps: true,
//     },
//     logging: false,
// });

// export default async function connectDB() {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }
