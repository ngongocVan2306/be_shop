import express, { Express } from 'express';
import productController from '~/controller/productController';
import { handleCheckTokenUser } from '~/middleware/jwtActions';
import { uploadImage } from '~/middleware/multer';

const router = express.Router();

const initApiProduct = (app: Express) => {
    router.post('/', uploadImage.array('files', 4), productController.handleCreateProduct);
    router.get('/', productController.handleGetProduct);
    router.get('/search', productController.handleSearchProduct);
    router.delete('/:id', productController.handleDeleteProduct);
    router.get('/detail/:id', productController.handleGetDetailProduct);

    // cart

    router.post('/addcart', handleCheckTokenUser, productController.handleAddProductTocart);
    router.get('/cart', handleCheckTokenUser, productController.handleGetCart);
    router.delete('/cart/:id', handleCheckTokenUser, productController.handleDeleteCart);
    router.get('/count', handleCheckTokenUser, productController.handleCountCart);
    router.put('/change-cart', handleCheckTokenUser, productController.handleChangeCount);
    return app.use('/v1/product', router);
};

export default initApiProduct;
