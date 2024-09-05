import express, { Express } from 'express';
import productController from '~/controller/productController';
import { uploadImage } from '~/middleware/multer';

const router = express.Router();

const initApiProduct = (app: Express) => {
    router.post('/', uploadImage.array('files', 3), productController.handleCreateProduct);
    return app.use('/v1/product', router);
};

export default initApiProduct;
