import { Express } from 'express';
import initApiUser from './apiUser';
import initApiProduct from './apiProduct';
import initApiCate from './apiCate';

const initApiRoutes = (app: Express) => {
    initApiUser(app);
    initApiProduct(app);
    initApiCate(app);
};

export default initApiRoutes;
