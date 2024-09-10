import express, { Express } from 'express';
import cateController from '~/controller/cateController';

const router = express.Router();

const initApiCate = (app: Express) => {
    router.post('/', cateController.handleCreateCate);
    router.get('/', cateController.handleGeCate);
    router.delete('/:id', cateController.handleDeleteCate);
    return app.use('/v1/cate', router);
};

export default initApiCate;
