import express, { Express } from 'express';
import productController from '~/controller/productController';
import { uploadImage } from '~/middleware/multer';

const router = express.Router();

const initApiProduct = (app: Express) => {
    router.post('/', uploadImage.array('files', 4), productController.handleCreateProduct);
    router.post('/addcart', productController.handleAddProductTocart);
    router.get('/', productController.handleGetProduct);
    router.get('/search', productController.handleSearchProduct);
    router.delete('/:id', productController.handleDeleteProduct);
    router.get('/detail/:id', productController.handleGetDetailProduct);
    router.get('/cart', productController.handleGetCart);
    router.delete('/cart/:id', productController.handleDeleteCart);
    router.get('/count/:id', productController.handleCountCart);
    router.put('/change-cart', productController.handleChangeCount);
    return app.use('/v1/product', router);
};

export default initApiProduct;
