import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CreateProductDto } from '~/dto/productDto/createProduct.dto';
import productService from '~/service/productService';
import { ResponseHandler } from '~/utils/Response';
import { validateData } from '~/utils/validate';

class ProductController {
    async handleCreateProduct(req: Request, res: Response) {
        try {
            const isValid = await validateData(CreateProductDto, req.body, res);
            if (!isValid) return;
            const data = await productService.createProductService(req.body);
            return res.status(httpStatus.OK).json(data);
        } catch (err) {
            console.log(err);
            return res.status(500).json(ResponseHandler(httpStatus.BAD_GATEWAY, null, 'Error From Server'));
        }
    }
}

const productController = new ProductController();
export default productController;
