import { Express } from 'express';
import initApiUser from './apiUser';
import initApiProduct from './apiProduct';

const initApiRoutes = (app: Express) => {
    initApiUser(app);
    initApiProduct(app);
};

export default initApiRoutes;
