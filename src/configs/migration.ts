import User from '~/models/User';

import { sequelize } from './connectDB';
import Product from '~/models/Product';
import Image from '~/models/Image';
import Product_User from '~/models/Product_User';
import AllCode from '~/models/AllCode';

(async () => {
    try {
        await sequelize.sync();
        const modals = [User, Product, Image, Product_User, AllCode];
        await Promise.all(modals.map((modal) => modal.sync()));
    } catch (error) {
        console.error('Error creating tables:', error);
    } finally {
        sequelize.close();
    }
})();
